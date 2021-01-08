/*  Variables a utilizar */

const seccionPaises = document.querySelector(".paises");
const fragmento = document.createDocumentFragment();
const modalContainer = document.querySelector(".modal-container");
const modal = document.querySelector(".modal");
let pais; let paises;

/* Obteniendo la data de la API de países */

( async () => {

    try{
        const response = await fetch('https://restcountries.eu/rest/v2/lang/es');
        const data = await response.json();

        paises = data;
        enviarDatos(paises);

    }catch(error){
        console.error('Error:' + error);
    }
   
})();

/* Enviando datos a la seccion paises */

function enviarDatos(datos){
    for(let i=0; i<12;i++){
        
        const divCard = document.createElement("DIV");

        divCard.classList.add(`card-${i}`,'card');
        
        divCard.innerHTML = `<img class="card-img" src="${datos[i].flag}" alt="pais ${datos[i].name}">
                                <span class="span-title">País</span>
                                <h4 class="card-title" onclick="mostrarModal(this)">${datos[i].name}</h4>
                                <p class="card-info"><b>Capital:</b> ${datos[i].capital} <br>
                                    <b>Población actual:</b> ${datos[i].population} pers.
                                </p>`;

        fragmento.appendChild(divCard);
    }
    seccionPaises.appendChild(fragmento)
}


/* Funciones para obtener pais, abrir y cerrar modal */

function mostrarModal(param){ 
    pais = buscarPaisPorNombre(param.textContent);
    const mapa = document.querySelector("#map")
    const titleModal = document.getElementById("title-modal");
    const continenteModal = document.getElementById("continente");
    mapa.innerHTML = `<iframe width="100%" height="200" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=es&amp;q=${pais.name}+(Pais)&amp;t=&amp;z=5&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>`;
    titleModal.textContent = pais.name;
    continenteModal.textContent = pais.subregion
    modalContainer.classList.add('show');
}

const btnCloseModal = document.getElementById("close-modal");
btnCloseModal.addEventListener('click', () =>{
    modalContainer.classList.remove("show");
    modal.removeChild(mapa);
})

function buscarPaisPorNombre(valor){
    for (pais of paises) {
        if(pais.name == valor){
            return pais;
        }
    }
}