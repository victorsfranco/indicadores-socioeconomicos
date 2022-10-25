let country = document.querySelector('#country-select').value;

document.querySelector('#country-select').addEventListener('change', (event) => {
   country = event.target.value;
} )

let year = document.querySelector('#year-select').value;

document.querySelector('#year-select').addEventListener('change', (event) => {
   year = event.target.value;
})


const searchResults = document.querySelector('#search-results');

async function getObj() {

   const allResults = document.createElement('div');
   allResults.setAttribute('id', 'all-results');
   searchResults.appendChild(allResults);

   const resultHeader = document.createElement('header');
   resultHeader.setAttribute('class', 'result-header');
   allResults.appendChild(resultHeader);

   const resultTitle = document.createElement('h3');
   resultHeader.setAttribute('class', 'result-title');
   resultHeader.appendChild(resultTitle);

   resultTitle.innerText = 'countryName - Year';

   const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/paises/${country}/indicadores?periodo=${year}`);

   const data = await response.json();

   data.map((item) => {
      try {
         
         const div = document.createElement('div');
         const indicatorTitle = document.createElement('h3');
         const indicatorValue = document.createElement('p');

         div.setAttribute('class', 'indicator-box');
         indicatorTitle.setAttribute('class', 'indicator-title');
         indicatorValue.setAttribute('class', 'indicator-value');

         indicatorTitle.innerText = item.indicador;
         indicatorValue.innerHTML = `${item.series[0].serie[0][year] * item.unidade.multiplicador} ${item.unidade.id}`

         div.appendChild(indicatorTitle);
         div.appendChild(indicatorValue);

         allResults.appendChild(div);
         
      }
      catch (error) {
         console.log(error);
      }
   })

   
}