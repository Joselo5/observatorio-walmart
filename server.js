const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.static(__dirname)); // sirve tus HTML, CSS y JS

let denuncias = [];

// Ruta raíz → muestra index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
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
