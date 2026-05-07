import { deleteMovie } from '../../services/MovieService.js';
import { createApiResult } from '../ApiResult.js';


// Screen for deleting a movie by its ID.
export const createDeleteMovieScreen = () => {
    const root = document.createElement('section');
    root.className = 'screen';

    root.innerHTML = `
        <div class="screen-header">
            <h2>DELETE /movies/{id}</h2>
        </div>

        <form class="inline-form" data-form>
            <label class="field">
                <span class="field__label">ID</span>
                <input name="id" type="text" placeholder="ID de la película" required />
            </label>
            <button class="btn danger" type="submit">Eliminar</button>
        </form>
    `;

    const form = root.querySelector('[data-form]');
    const idInput = form.querySelector('input[name="id"]');
    const submitBtn = form.querySelector('button[type="submit"]');

    const result = createApiResult({ title: 'Respuesta' });
    root.appendChild(result.root);


    // Handle form submission to delete the specified movie and display the API response.
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        submitBtn.disabled = true;
        idInput.disabled = true;
        result.clear('Eliminando...');

        try {
            const deleted = await deleteMovie(idInput.value);
            if (deleted === null || deleted === '' || deleted === undefined) {
                result.set({ data: { ok: true, message: 'Eliminado (sin contenido en respuesta)' } });
            } else {
                result.set({ data: deleted });
            }
        } catch (error) {
            result.set({ error });
        } finally {
            submitBtn.disabled = false;
            idInput.disabled = false;
        }
    });

    return root;
};
