//El presente administra una base de datos de personas teniendo en cuenta nombres, altura y peso

//Se calcula el índice de masa corporal y se dictamina su condición física teniendo en cuenta:

// IMC < 18.5 bajo peso
// 18.5 < IMC < 25 peso normal
// 25 <= IMC sobrepeso 

//Además pueden agregarse, modificarse y ordenar de manera ascendente y descendente los registros

//Presionando el botón default, se cargan registros predeterminados para evitar una gran carga de datos antes de probar

let btnMensaje = document.getElementById("btnMensaje");
let btnAgregar = document.getElementById("btnAgregar");
let btnDefault = document.getElementById("btnDefault");
let arrayPersonas = [];
const persona = {};
let acumuladorRegistroNombre = "";
let acumuladorRegistroAltura = "";
let acumuladorRegistroPeso = "";
let acumuladorRegistroMasaCorporal = "";
let acumuladorRegistroDictamen = "";
let acumuladorRegistrosDictamenModificar ="";

//Variables de registros

let nombrePersona = document.getElementById("formularioNombre");
let alturaPersona = document.getElementById("formularioAltura");
let pesoPersona = document.getElementById("formularioPeso");
let formularioRegistros = document.getElementById("formularioRegistros");
let formularioRegistrosNombre = document.getElementById("formularioRegistrosNombre");
let formularioRegistrosAltura = document.getElementById("formularioRegistrosAltura");
let formularioRegistrosPeso = document.getElementById("formularioRegistrosPeso");
let formularioRegistrosMasaCorporal = document.getElementById("formularioRegistrosMasaCorporal");
let formularioRegistrosDictamen = document.getElementById("formularioRegistrosDictamen");
let formularioRegistrosBotones = document.getElementById("formularioRegistrosBotones");

//Variables de botones de ordenamiento

let flechaNombreAscendente = document.getElementById("flechaNombreAscendente");
let flechaNombreDescendente = document.getElementById("flechaNombreDescendente");
let flechaAlturaAscendente = document.getElementById("flechaAlturaAscendente");
let flechaAlturaDescendente = document.getElementById("flechaAlturaDescendente");
let flechaPesoAscendente = document.getElementById("flechaPesoAscendente");
let flechaPesoDescendente = document.getElementById("flechaPesoDescendente");
let flechaMasaCorporalAscendente = document.getElementById("flechaMasaCorporalAscendente");
let flechaMasaCorporalDescendente = document.getElementById("flechaMasaCorporalDescendente");
let flechaDictamenAscendente = document.getElementById("flechaDictamenAscendente");
let flechaDictamenDescendente = document.getElementById("flechaDictamenDescendente");
let masaCorporal = 0;

// Función para validar ingreso alfabético en el campo nombre

const validarIngreso = (input) => {
    input.value = input.value.replace(/[^a-zA-Z]/g, '');
}

//Función para agregar registro de personas al array

const agregarPersona = () => {
    let arrayPersonas = localStorage.getItem("arrayPersonas");

    //Se aplica solamente al inicio, cuando no está definido el contenido del key "arrayPersonas" en el localStorage

    !localStorage.getItem("arrayPersonas") ? localStorage.setItem("arrayPersonas", JSON.stringify([])) : null;
    arrayPersonas = JSON.parse(localStorage.getItem("arrayPersonas"));
    persona.nombre = nombrePersona.value;
    persona.altura = alturaPersona.value;
    persona.peso = pesoPersona.value;
    persona.masaCorporal = persona.peso / (persona.altura / 100) ** 2;
    persona.masaCorporal = persona.masaCorporal.toFixed(2);
    persona.masaCorporal < 18.5 ? persona.dictamen = "bajo" :
        (persona.masaCorporal >= 18.5) && (persona.masaCorporal < 25) ? persona.dictamen = "normal" : persona.dictamen = "sobrepeso"
    arrayPersonas.push(persona);

    //Ningún campo deben tener contenido falsy para crear un objeto nuevo en el array

    persona.nombre && persona.altura && persona.peso ?
        (localStorage.setItem("arrayPersonas", JSON.stringify(arrayPersonas)), recuperarDatosLocalStorage(null)) :
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "¡Campos vacios!",
            footer: "Completá y volvé a intentar...",
            customClass: {
                popup: 'custom-swal-font custom-swal-bg',
                header: 'custom-swal-font custom-swal-bg',
                title: 'custom-swal-font custom-swal-bg',
                content: 'custom-swal-font custom-swal-bg',
                confirmButton: 'custom-swal-font custom-swal-bg',
                cancelButton: 'custom-swal-font custom-swal-bg'
            }
        });
}

//Función para recuperar los datos del localStorage

const recuperarDatosLocalStorage = (i) => {
    acumuladorRegistroNombre = ``;
    acumuladorRegistroAltura = ``;
    acumuladorRegistroPeso = ``;
    acumuladorRegistroMasaCorporal = ``;
    acumuladorRegistroDictamen = ``;
    acumuladorRegistroBotones = ``;
    (localStorage.getItem("arrayPersonas") && JSON.parse(localStorage.getItem("arrayPersonas")).length >= 1) ?
    arrayPersonas = JSON.parse(localStorage.getItem("arrayPersonas")): null;
    arrayPersonas.forEach((persona, index) => {
        i !== null ?
            index === i ?(
                acumuladorRegistroNombre += `<input id = "registroNombreModificar${index}" type = "text" value = "${persona.nombre}" oninput="validarIngreso(this)" style = "width: 100%; text-align: center"></input>`,
                acumuladorRegistroAltura += `<input id = "registroAlturaModificar${index}" type = "number" step = "1" value = "${persona.altura}" style = "width: 50%; text-align: center"></input>`,
                acumuladorRegistroPeso += `<input id = "registroPesoModificar${index}" type = "number" step = "1" value = "${persona.peso}" style = "width: 50%; text-align: center"></input>`,
                acumuladorRegistroMasaCorporal += `<div class = "formularioRegistrosmasaCorporal registro"> ${persona.masaCorporal}</div>`,
                acumuladorRegistroDictamen += `
                <div style = "padding: 5px; width: 100%" class="dropdown">
                    <button style = "width: 100%; background-color: lightgreen; color: black" class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                    ${persona.dictamen}
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <li><a class="dropdown-item" onclick = "modificarDatos(${index})" href="#">Aceptar</a></li>
                        <li><a class="dropdown-item" onclick = "recuperarDatosLocalStorage(null)" href="#">Cancelar</a></li>
                    </ul>
                </div>`
            )
            :
            (
                acumuladorRegistroNombre += `<div class = "formularioRegistrosNombre registro">${persona.nombre}</div>`,
                acumuladorRegistroAltura += `<div class = "formularioRegistrosAltura registro"> ${persona.altura}</div>`,
                acumuladorRegistroPeso += `<div class = "formularioRegistrosPeso registro"> ${persona.peso}</div>`,
                acumuladorRegistroMasaCorporal += `<div class = "formularioRegistrosmasaCorporal registro"> ${persona.masaCorporal}</div>`,
                acumuladorRegistroDictamen += `<div class ="formularioRegistrosDictamen registro"> ${persona.dictamen} </div>`
            )
        :
        (
            acumuladorRegistroNombre += `<div class = "formularioRegistrosNombre registro">${persona.nombre}</div>`,
            acumuladorRegistroAltura += `<div class = "formularioRegistrosAltura registro"> ${persona.altura}</div>`,
            acumuladorRegistroPeso += `<div class = "formularioRegistrosPeso registro"> ${persona.peso}</div>`,
            acumuladorRegistroMasaCorporal += `<div class = "formularioRegistrosMasaCorporal registro"> ${persona.masaCorporal}</div>`,
            
            acumuladorRegistroDictamen += `
                <div style = "padding: 5px; width: 100%" class="dropdown">
                    <button style = "width: 100%; background-color: lightgreen; color: black" class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                    ${persona.dictamen}
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <li><a class="dropdown-item" onclick = "recuperarDatosLocalStorage(${index})" href="#">Modificar</a></li>
                        <li><a class="dropdown-item" onclick = "eliminarPersona(${index})" href="#">Eliminar</a></li>
                    </ul>
                </div>`
        );
    })

    formularioRegistrosNombre.innerHTML = acumuladorRegistroNombre;
    formularioRegistrosAltura.innerHTML = acumuladorRegistroAltura;
    formularioRegistrosPeso.innerHTML = acumuladorRegistroPeso;
    formularioRegistrosMasaCorporal.innerHTML = acumuladorRegistroMasaCorporal;
    formularioRegistrosDictamen.innerHTML = acumuladorRegistroDictamen;
}

//Función para eliminar el registro seleccionado

const eliminarPersona = (i) => {
    arrayPersonas = JSON.parse(localStorage.getItem("arrayPersonas"));
    arrayPersonas.splice(i, 1);
    localStorage.setItem("arrayPersonas", JSON.stringify(arrayPersonas));
    recuperarDatosLocalStorage(null);
}

//Función para modificar los registros en el DOM

const modificarDatos = (i) => {
    arrayPersonas = JSON.parse(localStorage.getItem("arrayPersonas"));
    arrayPersonas[i].nombre = document.getElementById(`registroNombreModificar${i}`).value;
    arrayPersonas[i].altura = document.getElementById(`registroAlturaModificar${i}`).value;
    arrayPersonas[i].peso = document.getElementById(`registroPesoModificar${i}`).value;
    masaCorporal = arrayPersonas[i].peso / (arrayPersonas[i].altura / 100) ** 2;
    masaCorporal = masaCorporal.toFixed(2);
    arrayPersonas[i].masaCorporal = masaCorporal;
    masaCorporal < 18.5 ? arrayPersonas[i].dictamen = "bajo" :
        (masaCorporal >= 18.5) && (masaCorporal < 25) ? arrayPersonas[i].dictamen = "normal" : arrayPersonas[i].dictamen = "sobrepeso"
    localStorage.setItem("arrayPersonas", JSON.stringify(arrayPersonas));
    recuperarDatosLocalStorage(null);
}

//Función para ordenar, tanto de manera ascendente o descendente cualquier campo

const ordenar = (campo, orden) => {
    localStorage.getItem("arrayPersonas") && JSON.parse(localStorage.getItem("arrayPersonas")).length >= 1 ? (
        arrayPersonas = JSON.parse(localStorage.getItem("arrayPersonas")),

        //arrayPersonas se ordena de manera ascendente o descendente de acuerdo al campo que se elija

        campo == 'nombre' || campo == 'dictamen' ?
        orden == 'ascendente' ? arrayPersonas.sort((a, b) => (a[campo] > b[campo]) ? 1 : -1) :
        orden == 'descendente' ? arrayPersonas.sort((a, b) => (a[campo] < b[campo]) ? 1 : -1) :
        null :

        //Los campos altura, peso y masaCorporal es al ser valores numéricos es necesario aplicar parseFloat

        campo == 'altura' || campo == 'peso' || campo == 'masaCorporal' ?
        orden == 'ascendente' ? arrayPersonas.sort((a, b) => (parseFloat(a[campo]) > parseFloat(b[campo])) ? 1 : -1) :
        orden == 'descendente' ? arrayPersonas.sort((a, b) => (parseFloat(a[campo]) < parseFloat(b[campo])) ? 1 : -1) :
        null :
        null
    ) : null
    localStorage.setItem("arrayPersonas", JSON.stringify(arrayPersonas));
}

flechaNombreAscendente.addEventListener("click", () => ordenar('nombre', 'ascendente'));
flechaNombreDescendente.addEventListener("click", () => ordenar('nombre', 'descendente'));
flechaDictamenAscendente.addEventListener("click", () => ordenar('dictamen', 'ascendente'));
flechaDictamenDescendente.addEventListener("click", () => ordenar('dictamen', 'descendente'));
flechaMasaCorporalAscendente.addEventListener("click", () => ordenar('masaCorporal', 'ascendente'));
flechaMasaCorporalDescendente.addEventListener("click", () => ordenar('masaCorporal', 'descendente'));
flechaAlturaAscendente.addEventListener("click", () => ordenar('altura', 'ascendente'));
flechaAlturaDescendente.addEventListener("click", () => ordenar('altura', 'descendente'));
flechaPesoAscendente.addEventListener("click", () => ordenar('peso', 'ascendente'));
flechaPesoDescendente.addEventListener("click", () => ordenar('peso', 'descendente'));
btnAgregar.addEventListener("click", agregarPersona);

//Agrega el array de objetos a localStorage en default.js

btnDefault.addEventListener("click", () => {
    localStorage.setItem("arrayPersonas", JSON.stringify(arrayPersonasDefault));
    recuperarDatosLocalStorage(null);
});

btnMensaje.addEventListener("click", () => {
    Swal.fire({
        title: "¡Bienvenido!",
        text: "Agrega registros, modificalos y ordenalos, podes cargar los registros predeterminados con el boton DEFAULT",
        imageUrl: './assets/img/logo.jpg',
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: "logo CODERHOUSE",
        customClass: {
            popup: 'custom-swal-font custom-swal-bg',
            header: 'custom-swal-font custom-swal-bg',
            title: 'custom-swal-font custom-swal-bg',
            content: 'custom-swal-font custom-swal-bg',
            confirmButton: 'custom-swal-font custom-swal-bg',
            cancelButton: 'custom-swal-font custom-swal-bg'
        }
      });
})

recuperarDatosLocalStorage(null);