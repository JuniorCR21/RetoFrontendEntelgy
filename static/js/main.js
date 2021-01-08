/*  */

const seccionPaises = document.querySelector(".paises");
const fragmento = document.createDocumentFragment();

let paises = {};
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

function enviarDatos(datos){
    for(let i=0; i<12;i++){
        
        const divCard = document.createElement("DIV");

        divCard.classList.add(`card-${i}`,'card');
        
        divCard.innerHTML = `<img class="card-img" src="${datos[i].flag}" alt="pais ${datos[i].name}">
                                <span class="span-title">País</span>
                                <h4 class="card-title" onclick="buscarPaisPorNombre(this)">${datos[i].name}</h4>
                                <p>Capital: ${datos[i].capital}</p>
                                <p>La población actual es de: <b>${datos[i].population}</p>
                                <a href="#">Ver más</a>`;

        fragmento.appendChild(divCard);
    }
    seccionPaises.appendChild(fragmento)
}


function buscarPaisPorNombre(valor){
    for(let i=0; i<12; i++){
        if(paises[i].name = valor.textContent){
            return console.log("genial")
        }else{
            return console.log("Fue")
        }

    }
}