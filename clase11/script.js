const datosUsuario = {
  nombre: "",
  telefono: "",
  contrasenia: "",
  hobbies: "",
  nacionalidad: "",
};

let listaHobbies = [];

const formulario = document.querySelector("form");
const btn = document.querySelector("button");

const inputNombre = document.querySelector("#nombre");
const inputTelefono = document.querySelector("#tel");
const inputContrasenia = document.querySelector("#pass");

const campos = document.querySelectorAll("input");

const checkHobbies = document.querySelectorAll("[name=hobbies]");
const checkNacionalidad = document.querySelectorAll("[name=nacionalidad]");

const mensajeCampos = `<div class="error-campos" style="border: 1px solid red; text-align: center; font-size: .8em; color: red; font-weight: 500;">
                            <p>Debes completar este campo</p>
                        </div>`;

const mensajeHobbies = `<div class="error-hobbies" style="border: 1px solid red; text-align: center; font-size= 1.1em; color: red; font-weight: 700;">
                            <p>No debes ingresar más de 4 Hobbies</p>
                          </div>`;

const mensajeNac = `<div class="error-nacionalidad" style="border: 1px solid red; text-align: center; font-size= .8em; color: red; font-weight: 700;">
                        <p>Debe selecionar una nacionalidad</p>
                    </div>`;

btn.removeAttribute("disabled");
inputNombre.classList.remove("error");

formulario.addEventListener("submit", mostarMensajeError);
formulario.addEventListener("submit", listarHobbies);
formulario.addEventListener("submit", limitarHobbies);
formulario.addEventListener("submit", mostarNacionalidad);
formulario.addEventListener("submit", validarNacionalidad);
formulario.addEventListener("submit", renderizarDatos);
formulario.addEventListener("submit", validacion);


function validacion(evento) {
  evento.preventDefault();
//   listarHobbies();
//   validarNacionalidad();
//   mostarNacionalidad();
//   renderizarDatos();

  console.log(datosUsuario);
}

function mostarMensajeError() {
  campos.forEach((element) => {
    if (element.value.trim() == "") {
      element.classList.add("error");
      element.insertAdjacentHTML("afterend", mensajeCampos);
    }

    element.addEventListener("click", function () {
      element.classList.remove("error");
    });
  });
  formulario.removeEventListener("submit", mostarMensajeError);
}

function listarHobbies() {
  checkHobbies.forEach((hobbie) => {
    if (hobbie.checked == true) {
      listaHobbies.push(hobbie.id);
    }
    formulario.removeEventListener("submit", listarHobbies);
  });
}

function limitarHobbies() {
  if (listaHobbies.length > 4) {
    formulario.insertAdjacentHTML("beforeend", `${mensajeHobbies}`);
  }
  formulario.removeEventListener("submit", limitarHobbies);
}

function mostarNacionalidad() {
  checkNacionalidad.forEach((nacionalidad) => {
    if (nacionalidad.checked == true) {
      datosUsuario.nacionalidad = nacionalidad.id;
    }
  });
}

function validarNacionalidad() {
  if (datosUsuario.nacionalidad !== "") {
    datosUsuario.nacionalidad = datosUsuario.nacionalidad;
  } else {
    formulario.insertAdjacentHTML("beforeend", `${mensajeNac}`);
  }
  formulario.removeEventListener("submit", validarNacionalidad);
}

function renderizarDatos() {
  datosUsuario.nombre = inputNombre.value;
  datosUsuario.telefono = inputTelefono.value;
  datosUsuario.contrasenia = inputContrasenia.value;
  datosUsuario.hobbies = listaHobbies;
  mostarNacionalidad();
}
