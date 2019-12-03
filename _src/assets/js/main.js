'use strict';

const input = document.querySelector('#search-input');
const button = document.querySelector('#search-button');
const result = document.querySelector('#series-container');
const defaultImg = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
const urlBase = 'http://api.tvmaze.com/search/shows?q=';
const fav = document.querySelector('#fav-choose');
let favList = [];
let list = [];

// localStorage
const getSavedFavsFromLocalStorage = JSON.parse(
    localStorage.getItem('userFavs')
);
const setFavsIntoLocalStorage = () => {
    localStorage.setItem('userFavs', JSON.stringify(favList));
};

const getFromLocalStorage = () => {
    if (getSavedFavsFromLocalStorage !== null) {
        favList = getSavedFavsFromLocalStorage;
        paintFav();
    } else {
        favList = [];
    }
};

//feth
const getDataFromAPI = ev => {
    ev.preventDefault();
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

        boxShow.addEventListener('click', pickAsFav);
    }
};

//clear fav
const clearFav = () => {
    fav.innerHTML = '';
};

//paint fav 
const paintFav = () => {
    clearFav();

    const favListElement = document.createElement('ul');
    favListElement.classList.add('fav-list');
    fav.appendChild(favListElement);

    for (let item of favList) {
        const favImgData = item.img;
        const favNameData = item.name;
        const favIdData = item.id;

        const favBoxShow = document.createElement('li');
        favBoxShow.classList.add('fav-box-show');
        const favNameShow = document.createElement('h3');
        favNameShow.classList.add('fav-name-show');
        const favImgShow = document.createElement('img');
        favImgShow.classList.add('fav-img-show');
        const favDelete = document.createElement('div');
        favDelete.classList.add('fav-delete');
        const favIdShow = document.createElement('div');
        favIdShow.classList.add('fav-id-show');

        const favIdContent = document.createTextNode(favIdData);
        const favNameContent = document.createTextNode(favNameData);
        favImgShow.src = favImgData;

        favListElement.appendChild(favBoxShow);
        favBoxShow.appendChild(favImgShow);
        favBoxShow.appendChild(favNameShow);
        favBoxShow.appendChild(favIdShow);
        favBoxShow.appendChild(favDelete);
        favNameShow.appendChild(favNameContent);
        favIdShow.appendChild(favIdContent);

        favDelete.addEventListener('click', deleteFav);
    }

    const favDeleteAll = document.querySelector('#fav-deleteAll');
    if (favList.length > 1) {
        favDeleteAll.classList.remove('hidden');
        favDeleteAll.classList.add('fav-deleteAll-show');
    } else {
        favDeleteAll.classList.add('hidden');
    }

    favDeleteAll.addEventListener('click', deleteAll);
};

function deleteAll() {
    favList = [];
    paintFav();
}

//delete from fav
function deleteFav(ev) {
    const trigger = ev.currentTarget;
    const parent = trigger.parentElement;

    const img = parent.querySelector('.fav-img-show');
    const name = parent.querySelector('.fav-name-show');
    const id = parent.querySelector('.fav-id-show');

    const favImg = img.src;
    const favName = name.innerHTML;
    const favId = id.innerHTML;

    const favObj = { img: favImg, name: favName, id: favId };

    for (let i = 0; i < favList.length; i++) {
        if (favList[i].id === favObj.id) {
            favList.splice(i, 1);
        }
    }
    setFavsIntoLocalStorage();
    paintFav();
}
//pick series as fav
const pickAsFav = ev => {
    const trigger = ev.currentTarget;
    trigger.classList.toggle('fav-show');

    const img = trigger.querySelector('.img-show');
    const name = trigger.querySelector('.name-show');
    const id = trigger.querySelector('.id-show');

    const favImg = img.src;
    const favName = name.innerHTML;
    const favId = id.innerHTML;

    const favObj = { img: favImg, name: favName, id: favId };

    if (trigger.classList.contains('fav-show')) {
        favList.push(favObj);
    }
    setFavsIntoLocalStorage();
    paintFav();
};

getFromLocalStorage();
button.addEventListener('click', getDataFromAPI);