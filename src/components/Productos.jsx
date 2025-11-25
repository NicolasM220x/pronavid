import { useState } from "react";

export default function Productos({ productos, categoria, agregarCarrito }) {
  const [cantidades, setCantidades] = useState({});

  const cambiarCantidad = (id, valor) => {
    setCantidades(prev => ({
      ...prev,
      [id]: valor
    }));
  };

  const handleAgregar = (id) => {
    const cantidad = cantidades[id] || 1;
    console.log("🟢 BOTÓN CLICKEADO:", { categoria, id, cantidad });
    agregarCarrito(categoria, id, cantidad);
  };

  return (
    <div id="productos" className="productos">
      {productos.map((p) => (
        <div className="card" key={p.id}>
          <img src={p.img} alt={p.nombre} />
          <h3>{p.nombre}</h3>
          <p className="precio">${p.precio.toLocaleString()}</p>

          <input
            type="number"
            min="1"
            value={cantidades[p.id] || 1}
            onChange={e => cambiarCantidad(p.id, parseInt(e.target.value) || 1)}
            className="cantidad"
          />

          <button
            className="agregar"
            onClick={() => handleAgregar(p.id)}
          >
            Agregar al carrito
          </button>
        </div>
      ))}
    </div>
  );
}