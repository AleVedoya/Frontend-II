/*
REQUERIMIENTOS
- utilizar el formulario para captar el texto ingresado

- implmentar el evento "submit", utilizarlo para guardar el comentario en un array

- cada vez que se agrega un nuevo comentario renderizarlo en una etiqueta "p"(sacar del html los hardcodeados y hacerlo dinamico)

- constantemente guardar la informacion en localStorage, si se recarga la pagina deberian mantenerse los comentarios
*/

const formulario = document.querySelector("form");
const inputComentario = document.querySelector("#comentario");
const historialTexto = document.querySelector(".comentarios");

let listaComentarios = [];

if (localStorage.getItem("historialTexto")) {
  listaComentarios = JSON.parse(localStorage.getItem("historialTexto"));
}

renderidarTexto(listaComentarios);

//Leer los datos ingresados

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  let texto = normalizar(inputComentario);

  if (texto != "") {
    listaComentarios.push(texto);
    console.log(texto);
    inputComentario.value = "";

      guardarComentario(listaComentarios);
      renderidarTexto(listaComentarios);
  }
});

//Guadrdar el texto en el localStorage

function guardarComentario(listado) {
  localStorage.setItem("historialTexto", JSON.stringify(listado));
}

// Normalizar

function normalizar(input) {
  let texto = input.value.trim();
  return texto;
}

// renderizar

function renderidarTexto(listado) {
  historialTexto.innerHTML = "";

  listado.forEach((texto) => {
    let parrafo = document.createElement("p");
    parrafo.textContent = texto;
    historialTexto.appendChild(parrafo);
  });
}
