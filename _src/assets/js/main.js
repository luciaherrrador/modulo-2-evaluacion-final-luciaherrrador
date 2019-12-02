'use strict';
//console.log('>> Ready :)');
const input = document.querySelector('#search-input');
const button = document.querySelector('#search-button');
const result = document.querySelector('#series-container');
const defaultImg = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
const urlBase = 'http://api.tvmaze.com/search/shows?q=';
let list = [];

//feth
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

//paint

const paintSeries = arrShows => {
    result.innerHTML = '';
    for (let i = 0; i < arrShows.length; i++) {
        const nameData = arrShows[i].show.name;
        const imgData = arrShows[i].show.image;
        const idData = arrShows[i].show.id;

        const boxShow = document.createElement('div');
        boxShow.classList.add('show-container');
        const nameShow = document.createElement('h3');
        nameShow.classList.add('name-show');
        const imgShow = document.createElement('img');
        imgShow.classList.add('img-show');
        const idShow = document.createElement('p');
        idShow.classList.add('id-show');

        const idContent = document.createTextNode(idData);

        const nameContentinData = document.createTextNode(nameData);
        if (imgData === null) {
            imgShow.src = defaultImg;
        } else {
            imgShow.src = imgData.medium || imgData.original;
        }

        result.appendChild(boxShow);
        boxShow.appendChild(imgShow);
        boxShow.appendChild(nameShow);
        boxShow.appendChild(idShow);
        nameShow.appendChild(nameContentinData);
        idShow.appendChild(idContent);

    }
};


button.addEventListener('click', getDatafromApi);