import { getMovies } from '../../services/MovieService.js';
import { createMovieCard } from '../MovieCard.js';
import { createApiResult } from '../ApiResult.js';
import { downloadBlob, downloadText } from '../../utils/download.js';
import { objectsToCsvUtf8 } from '../../utils/csv.js';
import { createXlsxBlobFromObjects } from '../../utils/xlsx.js';


// Screen for listing all movies. It includes a reload button to refresh the list.

export const createListMoviesScreen = () => {
    const root = document.createElement('section');
    root.className = 'screen';

    root.innerHTML = `
        <div class="screen-header">
            <h2>GET /movies</h2>
            <div class="header-actions">
                <button class="btn" type="button" data-reload>Recargar</button>
                <button class="btn" type="button" data-export-csv>Exportar CSV</button>
            </div>
        </div>

        <div class="movie-grid" data-grid></div>
    `;

    const gridEl = root.querySelector('[data-grid]');
    const reloadBtn = root.querySelector('[data-reload]');
    const exportCsvBtn = root.querySelector('[data-export-csv]');

    let lastMovies = [];

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

    // Function to load movies from the API and render them.
    const load = async () => {
        reloadBtn.disabled = true;
        exportCsvBtn.disabled = true;
        result.clear('Cargando...');
        gridEl.innerHTML = '';

        try {
            const movies = await getMovies();
            lastMovies = Array.isArray(movies) ? movies : [];
            renderMovies(movies);
            const count = Array.isArray(movies) ? movies.length : 0;
            result.set({ data: movies, statusLabel: `OK (${count})` });
        } catch (error) {
            lastMovies = [];
            const failEl = document.createElement('p');
            failEl.className = 'muted';
            failEl.textContent = 'No se pudieron cargar las películas.';
            gridEl.appendChild(failEl);
            result.set({ error });
        } finally {
            reloadBtn.disabled = false;
            exportCsvBtn.disabled = false;
            exportXlsxBtn.disabled = false;
        }
    };

    const timestamp = () => {
        const d = new Date();
        const pad = (n) => String(n).padStart(2, '0');
        return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
    };

    const ensureMovies = async () => {
        if (Array.isArray(lastMovies) && lastMovies.length > 0) return lastMovies;
        const movies = await getMovies();
        lastMovies = Array.isArray(movies) ? movies : [];
        return lastMovies;
    };

    const setExportDisabled = (disabled) => {
        exportCsvBtn.disabled = disabled;
        reloadBtn.disabled = disabled;
    };

    // Handle click event on the export CSV button to generate and download a CSV file of the movies.
    exportCsvBtn.addEventListener('click', async () => {
        setExportDisabled(true);
        result.clear('Exportando CSV...');

        try {
            const movies = await ensureMovies();
            const csv = objectsToCsvUtf8(movies);
            const filename = `movies-${timestamp()}.csv`;
            downloadText(csv, filename, 'text/csv;charset=utf-8');
            result.set({ data: { ok: true, filename, rows: movies.length }, statusLabel: 'CSV' });
        } catch (error) {
            result.set({ error });
        } finally {
            setExportDisabled(false);
        }
    });


    reloadBtn.addEventListener('click', load);
    load();

    return root;
};
