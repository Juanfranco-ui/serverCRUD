import FieldsList from "./components/FieldsList";


function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="p-6 max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-600">
          Campos Deportivos
        </h1>
        <p className="mt-2 text-gray-600">Interfaz lista para conectar al backend.</p>

        <FieldsList />
      </div>
    </div>
  );
}

export default App;
