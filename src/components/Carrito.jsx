import GenerarPDF from "./GenerarPDF";

export default function Carrito({ carrito, setCarrito, visible, cerrar }) {
  const cambiarCantidad = (categoria, id, cant) => {
    const cantidad = parseInt(cant);
    if (cantidad < 1 || isNaN(cantidad)) return;
    
    setCarrito(prev => {
      const copia = { ...prev };
      const item = copia[categoria].find(i => i.id === id);
      if (item) {
        item.cantidad = cantidad;
      }
      return { ...copia };
    });
  };

  const eliminar = (categoria, id) => {
    setCarrito(prev => {
      const copia = { ...prev };
      copia[categoria] = copia[categoria].filter(i => i.id !== id);
      return copia;
    });
  };

  const total = Object.values(carrito)
    .flat()
    .reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  return (
    <div
      id="carrito"
      style={{ display: visible ? "flex" : "none" }}
      className="carrito"
    >
      <div className="header-carrito">
        <h2>Carrito</h2>
        <button className="cerrar" onClick={cerrar}>X</button>
      </div>

      <div id="contenido-carrito">
        {Object.entries(carrito).map(([cat, items]) => {
          // Si no hay items, no renderizar nada
          if (items.length === 0) return null;
          
          return (
            <div key={cat}>
              <h3 className="titulo-cat">{cat}</h3>

              {items.map(item => (
                <div className="item-carrito" key={item.id}>
                  <img src={item.img} alt={item.nombre} />

                  <div className="info">
                    <p>{item.nombre}</p>
                    <p>Precio: ${item.precio.toLocaleString()}</p>

                    <input 
                      type="number" 
                      min="1"
                      value={item.cantidad}
                      onChange={(e) => cambiarCantidad(cat, item.id, e.target.value)}
                    />

                    <p className="sub">
                      Subtotal: ${(item.precio * item.cantidad).toLocaleString()}
                    </p>
                  </div>

                  <button 
                    className="eliminar"
                    onClick={() => eliminar(cat, item.id)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      <div className="footer-carrito">
        <h3>Total: ${total.toLocaleString()}</h3>

        <GenerarPDF carrito={carrito} tipo="cotizacion" />
        <GenerarPDF carrito={carrito} tipo="pedido" />

        <button className="btn-accion agregar-mas" onClick={cerrar}>
          Agregar más
        </button>
      </div>
    </div>
  );
}