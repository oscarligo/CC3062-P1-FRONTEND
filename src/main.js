import { getMovies } from './services/MovieService.js';
import { createMovieCard } from './components/MovieCard.js';

const init = async () => {
    const container = document.getElementById('movie-container');
    
    const movies = await getMovies();
    
    container.innerHTML = '';

    if (movies.length === 0) {
        container.innerHTML = '<p>No se encontraron películas.</p>';
        return;
    }

    movies.forEach(movie => {
        const card = createMovieCard(movie);
        container.appendChild(card);
    });
};

document.addEventListener('DOMContentLoaded', init);