const year = '2016';

let country = document.querySelector('#country-select').value;

document.querySelector('#country-select').addEventListener('change', (event) => {
   country = event.target.value;  
} )

console.log(country);

const searchResults = document.querySelector('#search-results');

async function getObj() {
   const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/paises/${country}/indicadores?periodo=${year}`);

   const data = await response.json();

   data.map((item) => {
      try {
         const div = document.createElement('div');
         const title = document.createElement('h3');
         const number = document.createElement('p');

         title.innerText = item.indicador;
         number.innerHTML = `${item.series[0].serie[0][year] * item.unidade.multiplicador} ${item.unidade.id}`

         div.appendChild(title);
         div.appendChild(number);

         searchResults.appendChild(div);
         
      }
      catch (error) {
         console.log(error);
      }
   })

   
}