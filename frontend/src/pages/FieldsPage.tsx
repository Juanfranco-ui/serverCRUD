import { useState, useEffect } from "react";
import Modal from "../components/Modal";
import FieldsList from "../components/FieldsList";
import FieldForm, { type Field } from "../components/FieldForm";

export default function FieldsPage() {
  const [fields, setFields] = useState<Field[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingField, setEditingField] = useState<Field | null>(null);

  // --- Fetch inicial ---
  async function fetchFields() {
    try {
      setError(null);
      const res = await fetch("http://localhost:5000/fields");
      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }
      const data = await res.json();
      if (Array.isArray(data)) {
        setFields(data);
      } else {
        console.error("Formato de respuesta inválido:", data);
        setFields([]);
        setError("Recibimos datos inválidos del servidor.");
      }
    } catch (err: any) {
      console.error("Error al cargar canchas:", err);
      setFields([]);
      setError("No se pudo conectar con el servidor. Asegurate que la base de datos y el backend estén corriendo.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchFields();
  }, []);

  // --- Crear ---
  const handleCreate = async (data: Omit<Field, "field_id">) => {
    try {
      const res = await fetch("http://localhost:5000/fields", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Error al crear");
      const created = await res.json();
      setFields([...fields, created]);
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error al crear:", err);
      alert("Error al crear la cancha");
    }
  };

  // --- Editar ---
  const handleUpdate = async (data: Omit<Field, "field_id">) => {
    if (!editingField || !editingField.field_id) return;

    try {
      const res = await fetch(
        `http://localhost:5000/fields/${editingField.field_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      if (!res.ok) throw new Error("Error al actualizar");
      const updated = await res.json();
      setFields(fields.map((f) => (f.field_id === updated.field_id ? updated : f)));
      setIsModalOpen(false);
      setEditingField(null);
    } catch (err) {
      console.error("Error al actualizar:", err);
      alert("Error al actualizar la cancha");
    }
  };

  // --- Eliminar ---
  const handleDelete = async (field: Field) => {
    if (!field.field_id) return;
    if (!window.confirm(`¿Seguro que querés eliminar ${field.name}?`)) return;

    try {
      const res = await fetch(`http://localhost:5000/fields/${field.field_id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al eliminar");
      setFields(fields.filter((f) => f.field_id !== field.field_id));
    } catch (err) {
      console.error("Error al eliminar:", err);
      alert("Error al eliminar la cancha");
    }
  };

  const openCreateModal = () => {
    setEditingField(null);
    setIsModalOpen(true);
  };

  const openEditModal = (field: Field) => {
    setEditingField(field);
    setIsModalOpen(true);
  };

  if (loading) return <div className="text-gray-900 dark:text-white">Cargando...</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">Canchas</h1>

            <button
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-sm"
              onClick={openCreateModal}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Nueva Cancha
            </button>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Administrá las canchas de tu complejo</p>
        </div>

        {error && (
          <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <FieldsList
          fields={fields}
          onEdit={openEditModal}
          onDelete={handleDelete}
        />

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingField ? "Editar Cancha" : "Agregar Nueva Cancha"}
        >
          <FieldForm
            initialData={editingField}
            onSubmit={editingField ? handleUpdate : handleCreate}
            onCancel={() => setIsModalOpen(false)}
            isEditing={!!editingField}
          />
        </Modal>
      </div>
    </div>
  );
}
