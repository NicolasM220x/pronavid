import { useState } from "react";
import "../login.css";

export default function Login() {
  const [rol, setRol] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState(null);
  const [tipoMensaje, setTipoMensaje] = useState("");

  // ✅ 1️⃣ Defínela primero
  const crearToken = (user) => {
    const datos = {
      id: user.id,
      email: user.email,
      nombre: user.name,
      rol: user.rol,
      expira: Date.now() + 86400000, // 24h
    };
    return btoa(JSON.stringify(datos)); // codifica a base64
  };

  const login = async (email, password, rolEsperado) => {
    try {
      const response = await fetch(`http://localhost:3001/users?email=${email}`);
      const users = await response.json();

      if (users.length === 0)
        return { success: false, message: "Usuario no encontrado" };

      const user = users[0];

      if (user.password !== password)
        return { success: false, message: "Contraseña incorrecta" };

      if (user.rol !== rolEsperado)
        return { success: false, message: "No tienes permisos para este panel" };

      const token = crearToken(user); // ✅ ya está definida arriba
      return { success: true, token, user };
    } catch (error) {
      console.error("Error en login:", error);
      alert("Error: " + error.message);
      return { success: false, message: "Error del servidor" };
    }
  };

  const guardarToken = (token) => {
    localStorage.setItem("token", token);
  };

  const mostrarMensaje = (texto, tipo) => {
    setMensaje(texto);
    setTipoMensaje(tipo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resultado = await login(email, password, rol);

    if (resultado.success) {
      guardarToken(resultado.token);
      mostrarMensaje(
        `Bienvenido${rol === "Administrador" ? " Administrador" : ""}, ${
          resultado.user.name
        }`,
        "success"
      );
      setTimeout(() => {
        window.location.href =
          rol === "Administrador" ? "dashAdmin.html" : "dashAsesor.html";
      }, 1000);
    } else {
      mostrarMensaje(resultado.message, "error");
    }
  };

  // ✅ Funciones de prueba para los botones extra
  const checkToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("No hay token guardado");
    const datos = JSON.parse(atob(token));
    alert("Token válido para: " + datos.nombre);
  };

  const showToken = () => {
    const token = localStorage.getItem("token");
    alert(token || "No hay token guardado");
  };

  const logout = () => {
    localStorage.removeItem("token");
    alert("Sesión cerrada");
  };

  return (
    <div>
      <header className="encabezado">
        <img src="/Logopronavid.png" alt="Logo Pronavid" className="logo" />
        <h1>Inicio de Sesión</h1>
      </header>

      <main className="contenedor">
        <div className="selector-rol">
          <button onClick={() => setRol("Asesor")}>Asesor</button>
          <button onClick={() => setRol("Administrador")}>Administrador</button>
        </div>

        {rol && (
          <form onSubmit={handleSubmit} className="formulario">
            <h2>Inicio {rol}</h2>

            <label>Correo:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit">Iniciar Sesión</button>
            <a href="recuperarcontra.html">¿Olvidaste tu contraseña?</a>

            {mensaje && <div className={`msg ${tipoMensaje}`}>{mensaje}</div>}

            {/* ✅ Bloque fácil de quitar */}
            <div className="actions">
              <button type="button" id="checkTokenBtn" onClick={checkToken}>
                Verificar Token
              </button>
              <button type="button" id="showTokenBtn" onClick={showToken}>
                Ver Token
              </button>
              <button type="button" id="logoutBtn" onClick={logout}>
                Cerrar Sesión
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
