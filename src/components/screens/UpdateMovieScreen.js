import { updateMovie } from '../../services/MovieService.js';
import { createApiResult } from '../ApiResult.js';
import { createMovieForm } from '../MovieForm.js';

// Screen for updating an existing movie by ID. 

export const createUpdateMovieScreen = () => {
    const root = document.createElement('section');
    root.className = 'screen';

    root.innerHTML = `
        <div class="screen-header">
            <h2>PUT /movies/{id}</h2>
        </div>

        <div class="inline-form">
            <label class="field">
                <span class="field__label">ID a actualizar</span>
                <input name="id" type="text" placeholder="ID a actualizar" />
            </label>
        </div>
    `;

    const idInput = root.querySelector('input[name="id"]');

    const result = createApiResult({ title: 'Respuesta' });

    const form = createMovieForm({
        submitLabel: 'Actualizar',
        requireTitle: false,
        onSubmit: async (moviePayload) => {
            result.clear('Actualizando...');
            idInput.disabled = true;
            try {
                const updated = await updateMovie(idInput.value, moviePayload);
                result.set({ data: updated });
            } catch (error) {
                result.set({ error });
            } finally {
                idInput.disabled = false;
            }
        },
    });

    root.appendChild(form.root);
    root.appendChild(result.root);

    return root;
};
