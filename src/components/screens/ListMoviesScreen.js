import { getMovies } from '../../services/MovieService.js';
import { createMovieCard } from '../MovieCard.js';
import { createApiResult } from '../ApiResult.js';

export const createListMoviesScreen = () => {
    const root = document.createElement('section');
    root.className = 'screen';

    root.innerHTML = `
        <div class="screen-header">
            <h2>GET /movies</h2>
            <button class="btn" type="button" data-reload>Recargar</button>
        </div>

        <div class="movie-grid" data-grid></div>
    `;

    const gridEl = root.querySelector('[data-grid]');
    const reloadBtn = root.querySelector('[data-reload]');

    const result = createApiResult({ title: 'Respuesta' });
    root.appendChild(result.root);

    const renderMovies = (movies) => {
        gridEl.innerHTML = '';

        if (!Array.isArray(movies) || movies.length === 0) {
            const emptyEl = document.createElement('p');
            emptyEl.className = 'muted';
            emptyEl.textContent = 'No se encontraron películas.';
            gridEl.appendChild(emptyEl);
            return;
        }

        movies.forEach((movie) => {
            const card = createMovieCard(movie);
            gridEl.appendChild(card);
        });
    };

    const load = async () => {
        reloadBtn.disabled = true;
        result.clear('Cargando...');
        gridEl.innerHTML = '';

        try {
            const movies = await getMovies();
            renderMovies(movies);
            const count = Array.isArray(movies) ? movies.length : 0;
            result.set({ data: movies, statusLabel: `OK (${count})` });
        } catch (error) {
            const failEl = document.createElement('p');
            failEl.className = 'muted';
            failEl.textContent = 'No se pudieron cargar las películas.';
            gridEl.appendChild(failEl);
            result.set({ error });
        } finally {
            reloadBtn.disabled = false;
        }
    };

    reloadBtn.addEventListener('click', load);
    load();

    return root;
};
