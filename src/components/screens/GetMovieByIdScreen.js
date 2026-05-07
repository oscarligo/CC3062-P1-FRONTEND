import { getMovieById } from '../../services/MovieService.js';
import { createApiResult } from '../ApiResult.js';

// Screen for fetching a single movie by its ID. 

export const createGetMovieByIdScreen = () => {
    const root = document.createElement('section');
    root.className = 'screen';

    root.innerHTML = `
        <div class="screen-header">
            <h2>GET /movies/{id}</h2>
        </div>

        <form class="inline-form" data-form>
            <label class="field">
                <span class="field__label">ID</span>
                <input name="id" type="text" placeholder="ID de la película" required />
            </label>
            <button class="btn primary" type="submit">Buscar</button>
        </form>
    `;

    const form = root.querySelector('[data-form]');
    const idInput = form.querySelector('input[name="id"]');
    const submitBtn = form.querySelector('button[type="submit"]');

    const result = createApiResult({ title: 'Respuesta' });
    root.appendChild(result.root);

    // Handle form submission to fetch the specified movie and display the API response.    
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        submitBtn.disabled = true;
        idInput.disabled = true;
        result.clear('Cargando...');

        try {
            const movie = await getMovieById(idInput.value);
            result.set({ data: movie });
        } catch (error) {
            result.set({ error });
        } finally {
            submitBtn.disabled = false;
            idInput.disabled = false;
        }
    });

    return root;
};
