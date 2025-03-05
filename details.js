let search = window.location.search;
let params = new URLSearchParams(search);
let movieId = params.get("id");

let mainElm = document.querySelector('main');
let sectionElm = document.createElement("section");
sectionElm.className = "details"

const artworkUrl = "https://image.tmdb.org/t/p/w500"

const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYWI4M2I1ZjZhYzI0YzA3ZWJiMDBjY2EzYTYyNTliYyIsIm5iZiI6MTc0MTA3MzIxMS4xNDksInN1YiI6IjY3YzZhYjNiYzczZjE5OWY2YTkwNzhiZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1Nlv-2BxNNqcdqxKXSE5rhJvIS43r8CCONfYiGxykBU'
  }
};

fetch(url, options)
  .then(res => res.json())
.then(movie => {

let heroElm = document.createElement('div');
let headerElm = document.querySelector('header');
heroElm.className = 'hero';

headerElm.appendChild(heroElm);

heroElm.innerHTML = `
<figure>
    <img class="details__img" src="${artworkUrl}${movie.backdrop_path}" alt="">
</figure>
`;

    sectionElm.innerHTML = `
    <div class="details__headline">
        <h1 class="">${movie.title}</h1>
        <i class="fa-regular fa-bookmark details__icon"></i>
    </div>
    <p class="text__gray"><i class="icon_star fa-solid fa-star"></i> ${movie.vote_average}/10 IMDb</p>
    `;
console.log(movie)

document.querySelector("main").append(sectionElm);
})

