let search = window.location.search;
let params = new URLSearchParams(search);
let movieId = params.get("id");

const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US?append_to_response=release_dates,credits`;
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYWI4M2I1ZjZhYzI0YzA3ZWJiMDBjY2EzYTYyNTliYyIsIm5iZiI6MTc0MTA3MzIxMS4xNDksInN1YiI6IjY3YzZhYjNiYzczZjE5OWY2YTkwNzhiZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1Nlv-2BxNNqcdqxKXSE5rhJvIS43r8CCONfYiGxykBU'
  }
};

let headerElm = document.querySelector('header');
let detailsHeader = document.createElement('nav')
document.querySelector("header").append(detailsHeader)
detailsHeader.className = "details__header";
headerElm.classname = 'header'

detailsHeader.innerHTML = `
<div class="navigation__header">
  <a href="index.html"><i class="details__header fa-solid fa-arrow-left"></i></a>
  <label for="switch" class="switch details__header">
    <input class="navigation__btn" type="checkbox"  name="switch" id="switch">
    <span class="slider round"></span>
  </label>
`;

let mainElm = document.querySelector('main');

fetch(url, options)
  .then(res => res.json())
  .then(movie => {

    console.log(movie)
    
let sectionElm = document.createElement("section");
sectionElm.className = "details";

const artworkUrl = "https://image.tmdb.org/t/p/w500";

    let heroElm = document.createElement('section');
    heroElm.className = 'hero';

    document.querySelector("main").append(heroElm);

    heroElm.innerHTML = `
        <img class="details__img" src="${artworkUrl}${movie.backdrop_path}" alt="">
    `;

    sectionElm.innerHTML = `
      <div class="details__headline">
        <h1 class="details__blockMargin">${movie.title}</h1>
        <i class="fa-regular fa-bookmark details__icon"></i>
      </div>
      <p class="text__gray"><i class="icon_star fa-solid fa-star"></i> ${movie.vote_average}/10 IMDb</p>
      <div class="details__blockMargin">
      ${movie.genres.map(function (genre) {
                console.log(genre);
                return `<span class="movielist__genre" >${genre.name}</span>`
            }).join("")
                }     
      </div>
      <div class="navigation__header">
        <div>
          <p class="text__gray">Length</p>
          <p>${movie.runtime}min</p>
        </div>
        <div>
          <p class="text__gray">Language</p>
          <p>${movie.original_language}</p>
        </div>
        <div>
          <p class="text__gray">Rating</p>
          <p>${movie.rating}</p>
        </div>
      </div>
 
      <h2 class="details__blockMargin">Description</h2>
      <p>${movie.overview}</p>
      <div class="details__cast-overview">
          <h3 class="details__blockMargin">Cast</h3>
        <div>
          <button class="movielist__btn">see more</button>
        </div>
      </div>
      <div class="details__cast--grid"> </div> <!-- Added the cast grid container here -->
    `;

    // Append the sectionElm to main
    document.querySelector("main").append(sectionElm);

    // Fetch the cast details
    return fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`, options);
  })
  .then(res => res.json())
  .then(data => {

    // Map over the cast and display them in the grid
    document.querySelector(".details__cast--grid").innerHTML = data.cast
      .map(actor => `
        <article class="details__cast">
        <div>
          <a href="cast.html">
            <figure class="details__cast--img">
              <img class="popular__movie__img" src="https://image.tmdb.org/t/p/w185${actor.profile_path}" alt="${actor.name}">
            </figure>
          </a>
          <div class="details__cast__text">
            <h3 class="font_sans">${actor.name}</h3>
            <p class="text__gray">${actor.character}</p>
          </div>
        </article>
      `)
      .join("");
  })
