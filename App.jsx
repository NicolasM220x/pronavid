import { BrowserRouter, Routes, Route } from "react-router-dom";
import InicioPronavid from "./pages/index.jsx";
import Login from "./pages/login.jsx";
import Registro from "./pages/registro.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InicioPronavid />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
      </Routes>
    </BrowserRouter>
  );
}
