/**
 * Extract id as string from url to pokemon
 * @param {string} movieUrl - a url to a pokemon from pokeApi 
 * @returns {string}
 */

let mainElm = document.querySelector('main');
let sectionElm = document.createElement("section");
sectionElm.className = "movielist";
let popularElm = document.createElement("section")

const artworkUrl = "https://image.tmdb.org/t/p/w500";

let navElm = document.createElement('nav');
let headerElm = document.querySelector('header');
navElm.className = 'navigation';

headerElm.appendChild(navElm);

navElm.innerHTML = `
<div class="navigation__header no-columns">
<i class="fa-solid fa-bars"></i>
    <h1 class="">MyMovies</h1>
    <label for="switch" class="switch">
        <input class="navigation__btn" type="checkbox"  name="switch" id="switch">
        <span class="slider round"></span>
    </label>
</div>
`;


fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=bab83b5f6ac24c07ebb00cca3a6259bc', {
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer //eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYWI4M2I1ZjZhYzI0YzA3ZWJiMDBjY2EzYTYyNTliYyIsIm5iZiI6MTc0MTA3MzIxMS4xNDksInN1YiI6IjY3YzZhYjNiYzczZjE5OWY2YTkwNzhiZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1Nlv-2BxNNqcdqxKXSE5rhJvIS43r8CCONfYiGxykBU'
    }
}).then(response => response.json())
.then(data => {
    sectionElm.innerHTML = `
        <div class="movielist__popular--header movielist movielist__headline">
        <h2 class="">Now showing</h2>
        <button class="movielist__btn">see more</button>
    </div>
        <div class="movielist__content">
        ${data.results.map(movie => `<article class="movielist__card">
        <a href="details.html?id=${movie.id}">
            <figure class="movielist__img--container">
            <img class="popular__movie__img" src="${artworkUrl}/${movie.poster_path}" alt="${movie.original_title}">
            </figure>
        </a>
            <div class="movielist__text">
            <h3 class="font_sans">${movie.original_title}</h3>
            <p class="text__gray"><i class="icon_star fa-solid fa-star"></i> ${movie.vote_average}/10 IMDb</p>
            </div>
            </article>`).join("")}
    </div>
    `;

document.querySelector("main").append(sectionElm);
})

fetch('https://api.themoviedb.org/3/movie/popular?api_key=bab83b5f6ac24c07ebb00cca3a6259bc', {
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer //eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYWI4M2I1ZjZhYzI0YzA3ZWJiMDBjY2EzYTYyNTliYyIsIm5iZiI6MTc0MTA3MzIxMS4xNDksInN1YiI6IjY3YzZhYjNiYzczZjE5OWY2YTkwNzhiZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1Nlv-2BxNNqcdqxKXSE5rhJvIS43r8CCONfYiGxykBU'
    }
}).then(response => response.json())
.then(data => {
    popularElm.innerHTML = `
    <div class="movielist__popular--header">
        <h4 class=" movielist__popular--headline">Popular</h4>
        <button class="movielist__btn">see more</button>
    </div>
        ${data.results.map(movie => `
        <div class="movielist__popular--card">
        <a href="details.html?id=${movie.id}">
        <figure class="movielist__popular--img">
        <img class="popular__movie__img" src="${artworkUrl}/${movie.poster_path}" alt="${movie.original_title}">
        </figure>
        </a>
        <div class="margin-block--small movielist__popular--info">
        <h5 class="margin-block--small font_sans">${movie.original_title}</h5>
        <p class="margin-block--small text__gray"><i class="fa-solid fa-star icon_star"></i> ${movie.vote_average}/10 IMDb</p>
        ${movie.genre_ids.map(genre_id => {
        let currentGenre = genres.find(genre => genre.id == genre_id)
        return `<span class="font_sans movielist__genre">${currentGenre.name}</span>`
        }).join(" ")}
        </div>
        </div>`).join("")}
    `;

document.querySelector("main").append(popularElm);
})

let footerNavElm = document.createElement('nav');
let footerElm = document.querySelector('footer');
footerNavElm.className = 'footer';
footerElm.className = 'footer-test'

footerNavElm.innerHTML = `
<div class="footer__nav">
    <figure class="footer__img--film">
        <a href=""><img  src="films.png" alt=""></a>
    </figure>
    <figure class="footer__img">
        <a href="tickets.html"><img  src="ticket.png" alt=""></a>
    </figure>
    <figure class="footer__img">
        <a href="saved.html"><img  src="Saved.png" alt=""></a>
    </figure>
</div>

`;
footerElm.appendChild(footerNavElm);


