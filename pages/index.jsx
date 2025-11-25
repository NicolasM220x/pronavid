import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./inicio.css"; // <--- IMPORTANTE: Estilos separados

function Navbar() {
  return (
    <nav className="nav">
      <h1 className="logo">Pronavid</h1>

      <div className="nav-links">
        <Link to="/" className="link">Inicio</Link>
        <Link to="/cotizacion" className="link">Cotización</Link>
        <Link to="/login" className="link">Login</Link>
        <Link to="/registro" className="btn-registro">Registro</Link>
      </div>
    </nav>
  );
}

export default function InicioPronavid() {
  return (
    <div className="page">
      <Navbar />

      {/* HERO */}
      <section className="hero">
        <img
          src="https://media.istockphoto.com/id/1352506441/es/foto/patrón-horizontal-sin-costuras-de-frutas-verduras-y-bayas-saludables.jpg?s=612x612&w=0&k=20&c=U9tjODiawlUl9hjnYDH75BoPVM_6E1XMiZ8YiIyuNR0="
          alt="Frutas y verduras"
          className="hero-img"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-content"
        >
          <h1 className="hero-title">Bienvenido a Pronavid</h1>

          <p className="hero-text">
            Nutrición, calidad y bienestar para todos. Tu aliado confiable en productos saludables.
          </p>

          <button className="hero-btn">Ver Catálogo</button>
        </motion.div>
      </section>

      {/* DESTACADOS */}
      <section className="destacados">
        <h2 className="destacados-title">¿Qué ofrecemos?</h2>

        <div className="destacados-grid">
          <motion.div whileHover={{ scale: 1.05 }} className="card">
            <h3 className="card-title">Calidad</h3>
            <p>Productos seleccionados con estándares de primera.</p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} className="card">
            <h3 className="card-title">Nutrición</h3>
            <p>Alimentos pensados para tu bienestar y salud.</p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} className="card">
            <h3 className="card-title">Confianza</h3>
            <p>Un servicio que garantiza seguridad y satisfacción.</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
