const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Obtener todas las denuncias
app.get("/denuncias", (req, res) => {
  fs.readFile("data/denuncias.json", "utf8", (err, data) => {
    if (err) return res.status(500).send("Error leyendo denuncias");
    res.json(JSON.parse(data));
  });
});

// Actualizar estatus de una denuncia
app.post("/denuncias/:id/estatus", (req, res) => {
  const id = req.params.id;
  const nuevoEstatus = req.body.estatus;

  fs.readFile("data/denuncias.json", "utf8", (err, data) => {
    if (err) return res.status(500).send("Error leyendo denuncias");

    let denuncias = JSON.parse(data);
    denuncias = denuncias.map((d) =>
      d.id === id ? { ...d, estatus: nuevoEstatus } : d,
    );

    fs.writeFile(
      "data/denuncias.json",
      JSON.stringify(denuncias, null, 2),
      (err) => {
        if (err) return res.status(500).send("Error guardando denuncia");
        res.json({ mensaje: `Denuncia ${id} actualizada a ${nuevoEstatus}` });
      },
    );
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
// Agregar nueva denuncia
app.post("/denuncias", (req, res) => {
  fs.readFile("data/denuncias.json", "utf8", (err, data) => {
    if (err) return res.status(500).send("Error leyendo denuncias");

    let denuncias = [];
    if (data) {
      denuncias = JSON.parse(data);
    }

    const nuevaDenuncia = {
      id: Date.now().toString(), // genera un ID único
      ...req.body,
      estatus: "Pendiente",
    };

    denuncias.push(nuevaDenuncia);

    fs.writeFile(
      "data/denuncias.json",
      JSON.stringify(denuncias, null, 2),
      (err) => {
        if (err) return res.status(500).send("Error guardando denuncia");
        res.json({ mensaje: "Denuncia registrada", denuncia: nuevaDenuncia });
      },
    );
  });
});
