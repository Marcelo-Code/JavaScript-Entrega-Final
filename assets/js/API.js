let data = [];
const url = 'https://keto-diet.p.rapidapi.com/?protein_in_grams__lt=15&protein_in_grams__gt=5';

let cargarDatos = document.getElementById("cargarRecetas");
let menu = document.getElementById("menu");
let btnMensaje2 = document.getElementById("btnMensaje2")

let tabla = document.getElementById("tabla");

//Se realiza la petición de datos a la URL especificada y se guardan en el localStorage

async function obtenerDatos() {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'f825c538dfmsh1bc25d10f2da561p19b7a0jsn3dfeb8fabbe2',
                'x-rapidapi-host': 'keto-diet.p.rapidapi.com'
            }
        });
        if (!response.ok) {
            throw new Error('Error al obtener los datos');
        }
        const result = await response.json();
        localStorage.setItem("recetas", JSON.stringify(result));
    } catch (error) {
        console.error(error);
    }
}

//Se cargan los datos guardados en el localStorage al DOM

async function cargarRecetas(){
    const data = JSON.parse(localStorage.getItem("recetas"));
    let acumuladorLista = "";
        data.forEach((element, index) => {
            acumuladorLista += `<div class = "card">`;
            acumuladorLista += `
            <a class="fa-solid fa-xmark" onclick = "eliminarReceta(${index})"></a><br>
            <h2>${element.recipe}</h2>
            <h3>${element.category.category}</h3>
            `;
            acumuladorLista += `<ol type = "1">`;
            for (let propiedad in element) {
                (propiedad.startsWith('directions_step_') && element[propiedad] != null) ? 
                    acumuladorLista += `<li lang="en" data-translate="spanish">${element[propiedad]}</li>` : null;
            }
            acumuladorLista +=`</ol></div>`;
            tabla.innerHTML = acumuladorLista;
        });
}

//Se elimina la receta especificada del localStorage y se actualiza el DOM

const eliminarReceta = (index) =>{
    const data = JSON.parse(localStorage.getItem("recetas"));
    data.splice(index, 1);
    localStorage.setItem("recetas", JSON.stringify(data));
    cargarOpcionElegida();
}

//Se actualiza el DOM de acuero al tipo de receta elegida en el menú

const cargarOpcionElegida = () =>{
    const data = JSON.parse(localStorage.getItem("recetas"));
    let acumuladorLista = "";

    menu.value == "" ? cargarRecetas() 
    :(
    data.forEach((element, index) => {
        if(element.category.category === menu.value){
            acumuladorLista += `<div class = "card">`;
            acumuladorLista += `
            <a class="fa-solid fa-xmark" onclick = "eliminarReceta(${index})"></a><br>
            <h2>${element.recipe}</h2>
            <h3>${element.category.category}</h3>
            `;
            acumuladorLista += `<ol type = "1">`;
            for (let propiedad in element) {
                propiedad.startsWith('directions_step_') && element[propiedad] != null ?
                    acumuladorLista += `<li lang="en" data-translate="spanish">${element[propiedad]}</li>`
                :
                null
            }
            acumuladorLista +=`</ol></div>`;
            tabla.innerHTML = acumuladorLista;
        }
        acumuladorLista == "" ? (
            acumuladorLista = `<div></div>`,
            tabla.innerHTML = acumuladorLista
        )
        : null
    })
    )
}

cargarDatos.addEventListener("click", () => {
    obtenerDatos();
    cargarOpcionElegida()
});

menu.addEventListener("change", () => {
    cargarOpcionElegida()
});

btnMensaje2.addEventListener("click", () => {
    Swal.fire({
        title: "¡Bienvenido!",
        text: "Elegi las recetas Keto que prefieras",
        imageUrl: '../img/logo.jpg',
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