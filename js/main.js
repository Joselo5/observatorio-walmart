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

    // Guardar en localStorage (simulación inicial)
    let denuncias = JSON.parse(localStorage.getItem("denuncias")) || [];
    denuncias.push(nuevaDenuncia);
    localStorage.setItem("denuncias", JSON.stringify(denuncias));

    alert("Tu denuncia fue enviada para revisión.");
  });
