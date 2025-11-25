import { useState } from "react";
import "../login.css";

export default function Registro() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [rol, setRol] = useState("Asesor");
  const [codigoAdmin, setCodigoAdmin] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleRegistro = async (e) => {
    e.preventDefault();

    // Validar código si es administrador
    if (rol === "Administrador" && codigoAdmin !== "admin123") {
      setMensaje("Código de administrador incorrecto ❌");
      return;
    }

    try {
      // Leer la "DB" JSON desde el backend
      const response = await fetch("http://localhost:3001/users");
      const users = await response.json();

      // Verificar si el email ya existe
      const existe = users.some((u) => u.email === email);
      if (existe) {
        setMensaje("El correo ya está registrado");
        return;
      }

      // Crear nuevo usuario
      const nuevoUsuario = {
        id: users.length + 1,
        email,
        password,
        name,
        rol,
      };

      // Enviar al backend para que lo agregue al JSON
      const res = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoUsuario),
      });

      if (!res.ok) throw new Error("Error al registrar usuario");

      setMensaje("Usuario registrado correctamente ✅");

      // Limpiar formulario
      setEmail("");
      setPassword("");
      setName("");
      setRol("Asesor");
      setCodigoAdmin("");
    } catch (error) {
      console.error(error);
      setMensaje("Error al registrar usuario");
    }
  };

  return (
    <div>
      <header className="encabezado">
        <img src="/Logopronavid.png" alt="Logo Pronavid" className="logo" />
        <h1>Registro de Usuario</h1>
      </header>

      <main className="contenedor">
        <form onSubmit={handleRegistro} className="formulario">
          <label>Nombre:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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

          <label>Rol:</label>
          <select value={rol} onChange={(e) => setRol(e.target.value)}>
            <option value="Asesor">Asesor</option>
            <option value="Administrador">Administrador</option>
          </select>

          {/* Input extra solo si es administrador */}
          {rol === "Administrador" && (
            <>
              <label>Código Admin:</label>
              <input
                type="password"
                value={codigoAdmin}
                onChange={(e) => setCodigoAdmin(e.target.value)}
                placeholder="Ingresa el código admin"
                required
              />
            </>
          )}

          <button type="submit">Registrar</button>

          {mensaje && <div className="msg">{mensaje}</div>}
        </form>
      </main>
    </div>
  );
}
