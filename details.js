let search = window.location.search;
let params = new URLSearchParams(search);
let movieId = params.get("id");


const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US&append_to_response=release_dates,credits,videos`;
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
  <ul class="navigation__list">
    <li>
      <a href="index.html">
        <i class="navigation__icon fa-sharp fa-solid fa-arrow-left"></i>
      </a>
    </li>
    <li class="navigation__item">
    <label for="switch" class="switch">
     <input class="navigation__btn" type="checkbox"  name="switch" id="switch">
     <span class="slider round"></span>
     </label>
    </li>
</ul>
  
  </div>
`;

let mainElm = document.querySelector('main');


fetch(url, options)
  .then(res => res.json())
  .then(movie => {

    console.log(movie)
    
    function findRating(release_dates_array){
      let localRelease = release_dates_array.results.find(release => release.iso_3166_1 == "US")
      let release = localRelease.release_dates.find(localRelease => localRelease.certification != "")
      return release.certification
    }

    // function findVideo(videos_array){
    //   let videos = videos_array.results.find(results => results.iso_639_1 == "US")
    //   let video = videos.release_dates.find(videos => videos.id != "")
    //   return video.id
      
    // }
    // console.log(results.video);

    const runtime = movie.runtime; // Runtime (minutter)
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;

let sectionElm = document.createElement("section");
sectionElm.className = "details";

const artworkUrl = "https://image.tmdb.org/t/p/w500";

    let heroElm = document.createElement('section');
    heroElm.className = 'hero';

    document.querySelector("main").append(heroElm);

    heroElm.innerHTML = `
        <img class="details__img" src="${artworkUrl}${movie.backdrop_path}" alt="">
        <div class="hero__play-button" id="trailerBtn">
        <i class="fa-solid fa-play"></i>
      </div>
        <!-- <div class="hero__startblock">
          <a href=""><img src="Play.png" alt=""></a>
        </div> -->
    `;

    sectionElm.innerHTML = `
      <div class="details__headline">
        <h1 class="details__blockMargin headliner font_sans">${movie.title}</h1>
          <i class="fa-regular fa-bookmark details__icon"></i>
      </div>
      <p class="text__gray"><i class="icon_star fa-solid fa-star"></i> ${movie.vote_average}/10 IMDb</p>
      <div class="details__blockMargin">
      ${movie.genres.map(function (genre) {
                return `<span class="movielist__genre font_sans" >${genre.name}</span>`
            }).join("")
                }     
      </div>
      <div class="navigation__header">
        <div>
          <p class="text__gray justified">Length</p>
          <p class="font_sans justified">${hours}h ${minutes}min</p>
        </div>
        <div>
          <p class="text__gray justified">Language</p>
          <p class=" font_sans justified">${movie.original_language}</p>
        </div>
        <div>
          <p class="text__gray justified">Rating</p>
          <p class="font_sans justified">${findRating(movie.release_dates)}</p>
        </div>
      </div>
 
      <h2 class="details__blockMargin">Description</h2>
      <p class="text__gray font_sans">${movie.overview}</p>
      <div class="details__cast-overview">
          <h3 class="details__blockMargin">Cast</h3>
        <div>
          <button class="movielist__btn">see more</button>
        </div>
      </div>
      <div class="details__cast--grid"> </div> <!-- Added the cast grid container here -->
    `;

    document.querySelector("main").append(sectionElm);


  // MODAL START - Add modal for movie trailer
  let modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close">&times;</span>
      <iframe id="videoFrame" width="100%" height="315" frameborder="0" allowfullscreen></iframe>
    </div>
  `;
  document.body.appendChild(modal);

  const trailerBtn = document.getElementById("trailerBtn");
  const closeModal = modal.querySelector(".close");
  const videoFrame = document.getElementById("videoFrame");

  trailerBtn.addEventListener("click", async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      const videos = data.videos.results;

      if (videos.length > 0) {
        const trailer = videos.find(v => v.type === "Trailer") || videos[0];
        const videoUrl = `https://www.youtube.com/embed/${trailer.key}`;
        videoFrame.src = videoUrl;
        modal.style.display = "flex";
      } else {
        alert("No trailer available.");
      }
    } catch (error) {
      console.error("Error fetching video:", error);
    }
  });

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
    videoFrame.src = "";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      videoFrame.src = "";
    }
  });
  // MODAL END


    // Fetching the cast details
    return fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`, options);
  })
  .then(res => res.json())
  .then(data => {
    
    document.querySelector(".details__cast--grid").innerHTML = data.cast
      .map(actor => `
        <article class="details__cast">
        <div>
          <a href="cast.html">
            <figure class="details__cast--img">
              <img class="popular__movie__img" src="https://image.tmdb.org/t/p/w185${actor.profile_path}" alt="${actor.name}">
            </figure>
          </a>
          <div class="details__cast__text details__blockMargin">
            <h3 class="font_sans">${actor.name}</h3>
            <p class="text__gray">${actor.character}</p>
          </div>
        </article>
      `)
      .join("");

      
  })
