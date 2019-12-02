'use strict';
//console.log('>> Ready :)');
const input = document.querySelector("#search-input");
const button = document.querySelector("#search-button");
const result = document.querySelector("#series-container");
const urlBase = 'http://api.tvmaze.com/search/shows?q=';
let list = [];

const getDatafromApi = event => {
    event.preventDefault();
    const inputValue = input.value.toLowerCase();
    fetch(urlBase + inputValue)
        .then(response => response.json())
        .then(data => {
            list = data;
            paintSeries(data);
        });
};

button.addEventListener('click', getDatafromApi);