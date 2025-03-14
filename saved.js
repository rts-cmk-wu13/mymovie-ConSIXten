document.addEventListener('DOMContentLoaded', () => {
  const savedMoviesContainer = document.querySelector('.saved-movies-container');

  function loadSavedMovies() {
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];
    savedMoviesContainer.innerHTML = '';

    if (savedMovies.length === 0) {
      savedMoviesContainer.innerHTML = '<p>No saved movies yet. <br> Go explore and find your saved movies here</p>';
      return;
    }

    savedMovies.forEach(movie => {
      const movieElement = document.createElement('div');
      movieElement.className = 'saved-movie';
      movieElement.innerHTML = `
      <figure class="saved-movie__img--container">
          <img class="saved-movie__img" src="https://image.tmdb.org/t/p/w500${movie.backdrop_path}" alt="${movie.title}">
      </figure>
        <div class="saved-movie__info">
          <h3>${movie.title}</h3>
        </div>
        <button class="saved-movie__remove" data-id="${movie.id}">
          <i class="fa-solid fa-trash"></i>
        </button>
      `;
      savedMoviesContainer.appendChild(movieElement);

      // Add remove functionality
      const removeBtn = movieElement.querySelector('.saved-movie__remove');
      removeBtn.addEventListener('click', () => {
        const updatedMovies = savedMovies.filter(m => m.id !== movie.id);
        localStorage.setItem('savedMovies', JSON.stringify(updatedMovies));
        loadSavedMovies(); 
      });
    });
  }

  loadSavedMovies();
});
