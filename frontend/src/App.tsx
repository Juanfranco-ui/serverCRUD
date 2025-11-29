import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import FieldsPage from "./pages/FieldsPage";
import ComplexPage from "./pages/ComplexPage";
import ServicesPage from "./pages/ServicesPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/canchas" />} />
          <Route path="canchas" element={<FieldsPage />} />
          <Route path="complejo" element={<ComplexPage />} />
          <Route path="servicios" element={<ServicesPage />} />
          {/* Agregá más rutas según lo que necesites */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;