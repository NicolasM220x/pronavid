import { jsPDF } from "jspdf";
import QRious from "qrious";
import { useEffect, useRef } from "react";

export default function GenerarPDF({ carrito, tipo }) {
  const canvasRef = useRef(null);

  // Genera el canvas del QR al montar / cambiar tipo o carrito
  useEffect(() => {
    const nDoc = Math.floor(Math.random() * 90000) + 10000;
    const total = Object.values(carrito)
      .flat()
      .reduce((acc, p) => acc + p.precio * p.cantidad, 0);

    const qrData = `${tipo.toUpperCase()} #${nDoc} - Total: $${total}`;
    const qr = new QRious({
      element: canvasRef.current,
      value: qrData,
      size: 200,
    });
    // No necesitamos hacer nada más, el canvas tiene el QR
  }, [carrito, tipo]);

  const generarPDF = async () => {
    const pdf = new jsPDF();
    const fecha = new Date().toLocaleString();
    const nDoc = Math.floor(Math.random() * 90000) + 10000;

    // Logo
    const logoURL = "https://i.imgur.com/b7cT5OQ.png";
    const img = await loadImage(logoURL);
    pdf.addImage(img, "PNG", 10, 10, 30, 30);

    // Título
    pdf.setFontSize(20);
    pdf.text(
      tipo === "cotizacion" ? "Cotización PRONAVID" : "Pedido PRONAVID",
      50,
      20
    );
    pdf.setFontSize(12);
    pdf.text("Fecha: " + fecha, 50, 28);
    pdf.text("Documento N°: " + nDoc, 50, 35);

    // Tabla de carrito
    let y = 60;
    let totalGeneral = 0;
    for (const categoria in carrito) {
      const items = carrito[categoria];
      if (!items || items.length === 0) continue;

      pdf.setFontSize(14);
      pdf.text(categoria, 10, y);
      y += 6;

      pdf.setFontSize(12);
      pdf.text("Producto", 10, y);
      pdf.text("Cant", 90, y);
      pdf.text("Precio", 120, y);
      pdf.text("Subtotal", 160, y);
      y += 4;

      items.forEach((prod) => {
        const subtotal = prod.precio * prod.cantidad;
        totalGeneral += subtotal;

        pdf.text(prod.nombre, 10, y);
        pdf.text(String(prod.cantidad), 95, y);
        pdf.text("$" + prod.precio.toLocaleString(), 120, y);
        pdf.text("$" + subtotal.toLocaleString(), 160, y);

        y += 6;
        if (y > 270) {
          pdf.addPage();
          y = 20;
        }
      });

      y += 6;
    }

    pdf.setFontSize(14);
    pdf.text(`TOTAL GENERAL: $${totalGeneral.toLocaleString()}`, 10, y + 5);

    // QR — lo agregamos como imagen desde el canvas
    const qrCanvas = canvasRef.current;
    const dataUrl = qrCanvas.toDataURL("image/png");
    pdf.addImage(dataUrl, "PNG", 160, 10, 40, 40);

    pdf.save(`${tipo}_pronavid_${nDoc}.pdf`);
  };

  const loadImage = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = () => resolve(img);
      img.src = url;
    });
  };

  return (
    <div className="botones-pdf">
      {/* Canvas oculto para generar el QR */}
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

      <button onClick={generarPDF}>
        {tipo === "cotizacion" ? "Guardar Cotización" : "Registrar Pedido"}
      </button>
    </div>
  );
}
