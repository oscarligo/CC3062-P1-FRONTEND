import { createMovie } from '../../services/MovieService.js';
import { createApiResult } from '../ApiResult.js';
import { createMovieForm } from '../MovieForm.js';

export const createCreateMovieScreen = () => {
    const root = document.createElement('section');
    root.className = 'screen';

    root.innerHTML = `
        <div class="screen-header">
            <h2>POST /movies</h2>
        </div>
    `;

    const result = createApiResult({ title: 'Respuesta' });

    const form = createMovieForm({
        submitLabel: 'Crear',
        requireTitle: true,
        onSubmit: async (moviePayload) => {
            result.clear('Creando...');
            try {
                const created = await createMovie(moviePayload);
                result.set({ data: created });
            } catch (error) {
                result.set({ error });
            }
        },
    });

    root.appendChild(form.root);
    root.appendChild(result.root);

    return root;
};
