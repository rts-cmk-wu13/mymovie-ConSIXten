document.addEventListener('DOMContentLoaded', () => {
  // Add header navigation
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

  const savedMoviesContainer = document.querySelector('.saved-movies-container');

  function loadSavedMovies() {
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];
    savedMoviesContainer.innerHTML = '';

    if (savedMovies.length === 0) {
      savedMoviesContainer.innerHTML = '<p>No saved movies yet. <br> Go explore and find your saved movies here!</p>';
      return;
    }

    savedMovies.forEach(movie => {
      const movieElement = document.createElement('div');
      movieElement.className = 'saved-movie';
      movieElement.innerHTML = `
      <a href="details.html?id=${movie.id}">
      <figure class="saved-movie__img--container">
          <img class="saved-movie__img" src="https://image.tmdb.org/t/p/w500${movie.backdrop_path}" alt="${movie.title}">
      </figure>
      </a>
        <div class="saved-movie__info">
          <h3>${movie.title}</h3>
        </div>
        <button class="saved-movie__remove" data-id="${movie.id}">
          <i class="fa-solid fa-trash"></i>
        </button>
      `;
      savedMoviesContainer.appendChild(movieElement);

      const removeBtn = movieElement.querySelector('.saved-movie__remove');
      removeBtn.addEventListener('click', () => {
        const updatedMovies = savedMovies.filter(m => m.id !== movie.id);
        localStorage.setItem('savedMovies', JSON.stringify(updatedMovies));
        loadSavedMovies(); 
      });
    });
  }

  loadSavedMovies();

  // Add footer navigation
  let footerNavElm = document.createElement('nav');
  let footerElm = document.querySelector('footer');
  footerNavElm.className = 'footer';
  footerElm.className = 'footer-fixed'; 

  footerNavElm.innerHTML = `
  <div class="footer__nav">
      <figure class="footer__img--film">
          <a href="index.html"><img  src="films.png" alt=""></a>
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
});
