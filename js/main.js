document
  .getElementById("form-denuncia")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const nuevaDenuncia = {
      id: Date.now().toString(),
      titulo:
        document.getElementById("producto").value +
        " – " +
        document.getElementById("ubicacion").value,
      producto: document.getElementById("producto").value,
      descripcion: document.getElementById("descripcion").value,
      evidencias: [], // aquí se pueden procesar archivos
      clasificacion: "Pendiente de revisión",
      estatus: "Pendiente",
    };

    const express = require("express");
    const app = express();

    app.use(express.json()); // para leer JSON del body

    let denuncias = []; // almacenamiento temporal en memoria

    // Ruta raíz
    app.get("/", (req, res) => {
      res.send("Servidor Observatorio Walmart en línea 🚀");
    });

    // Ruta de salud
    app.get("/salud", (req, res) => {
      res.send("OK");
    });

    // Obtener todas las denuncias
    app.get("/denuncias", (req, res) => {
      res.json(denuncias);
    });

    // Crear nueva denuncia
    app.post("/denuncias", (req, res) => {
      const nuevaDenuncia = req.body;
      denuncias.push(nuevaDenuncia);
      res
        .status(201)
        .json({ mensaje: "Denuncia recibida", denuncia: nuevaDenuncia });
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  });
