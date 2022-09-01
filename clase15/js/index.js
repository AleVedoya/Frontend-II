/* -------------------------------------------------------------------------- */
/*                              Declaro Variables                             */
/* -------------------------------------------------------------------------- */

const formulario = document.querySelector("form");
const inputComentario = document.querySelector("#comentario");
const historialTexto = document.querySelector(".comentarios");

const botonReset = document.createElement("button");
botonReset.innerText = "RESETEAR";
botonReset.setAttribute("type", "reset");
formulario.appendChild(botonReset);

let listaComentarios = [];

if (localStorage.getItem("historialTexto")) {
  listaComentarios = JSON.parse(localStorage.getItem("historialTexto"));
}

renderidarTexto(listaComentarios);

/* -------------------------------------------------------------------------- */
/*                          Leer los datos ingresados                         */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*                             Resetear los datos                             */
/* -------------------------------------------------------------------------- */

formulario.addEventListener("reset", function (evento) {
  evento.preventDefault;

  historialTexto.innerHTML = "";
  listaComentarios = [];

  localStorage.clear();
});

/* -------------------------------------------------------------------------- */
/*                    Guadrdar el texto en el localStorage                    */
/* -------------------------------------------------------------------------- */

function guardarComentario(listado) {
  localStorage.setItem("historialTexto", JSON.stringify(listado));
}

/* -------------------------------------------------------------------------- */
/*                                 Normalizar                                 */
/* -------------------------------------------------------------------------- */

function normalizar(input) {
  let texto = input.value.trim();
  return texto;
}

/* -------------------------------------------------------------------------- */
/*                                 Renderizar comentarios                     */
/* -------------------------------------------------------------------------- */

function renderidarTexto(listado) {
  historialTexto.innerHTML = "";

  listado.forEach((texto) => {
    let parrafo = document.createElement("p");
    let fecha = new Date();

    let dia = fecha.getDay()
    let mes = fecha.getMonth();
    let year = fecha.getFullYear();
    let hora = fecha.getHours()
    let minutos = fecha.getMinutes()
    
    parrafo.textContent = `${texto} - ${dia}/${mes}/${year} -  ${hora}:${minutos}`;
    historialTexto.appendChild(parrafo);
  });
}