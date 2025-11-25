import { useState } from "react";
import catalogo from "./data/catalogo";
import Header from "./components/Header";
import Categorias from "./components/Categorias";
import Productos from "./components/Productos";
import Carrito from "./components/Carrito";

export default function App() {
  const [categoriaActual, setCategoriaActual] = useState("Granola");
  const [carrito, setCarrito] = useState({});
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  const agregarCarrito = (categoria, id, cantidad) => {
    console.log("🔴 FUNCIÓN LLAMADA - Timestamp:", Date.now());
    console.log("📦 Datos recibidos:", { categoria, id, cantidad });
    
    const producto = catalogo[categoria].find(p => p.id === id);
    
    if (!producto) {
      console.error("❌ Producto no encontrado");
      return;
    }

    console.log("✅ Producto encontrado:", producto);

    setCarrito(prev => {
      console.log("📋 Carrito ANTES:", JSON.stringify(prev, null, 2));
      
      const copia = { ...prev };
      if (!copia[categoria]) copia[categoria] = [];

      const existe = copia[categoria].find(p => p.id === id);

      if (existe) {
        console.log(`⚠️ Producto YA EXISTE. Cantidad actual: ${existe.cantidad}, sumando: ${cantidad}`);
        existe.cantidad += cantidad;
        console.log(`✅ Nueva cantidad: ${existe.cantidad}`);
      } else {
        console.log("🆕 Producto NUEVO, agregando al carrito");
        copia[categoria].push({
          id,
          nombre: producto.nombre,
          precio: producto.precio,
          img: producto.img,
          cantidad
        });
      }

      console.log("📋 Carrito DESPUÉS:", JSON.stringify(copia, null, 2));
      return copia;
    });

    setMostrarCarrito(true);
  };

  return (
    <>
      <Header />
      <Categorias 
        categoriaActual={categoriaActual}
        setCategoria={setCategoriaActual}
      />
      <Productos 
        productos={catalogo[categoriaActual]}
        categoria={categoriaActual}
        agregarCarrito={agregarCarrito}
      />
      <Carrito 
        carrito={carrito}
        setCarrito={setCarrito}
        visible={mostrarCarrito}
        cerrar={() => setMostrarCarrito(false)}
      />
    </>
  );
}