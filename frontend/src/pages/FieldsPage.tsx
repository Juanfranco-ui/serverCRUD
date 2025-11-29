import { useState } from "react";
import FieldsList from "../components/FieldsList";
import Modal from "../components/Modal";

export default function FieldsPage() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="flex justify-between mb-6 items-center">
        <h1 className="text-2xl font-bold">Canchas</h1>

        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          onClick={() => setOpen(true)}
        >
          + Nueva Cancha
        </button>
      </div>

      <FieldsList />

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Agregar Nueva Cancha"
      >
        <FieldsList.Form onSuccess={() => setOpen(false)} />
      </Modal>
    </div>
  );
}
