const toNumberOrUndefined = (value) => {
    if (value === undefined || value === null) return undefined;
    const trimmed = `${value}`.trim();
    if (trimmed === '') return undefined;
    const asNumber = Number(trimmed);
    return Number.isFinite(asNumber) ? asNumber : undefined;
};

const cleanOrUndefined = (value) => {
    if (value === undefined || value === null) return undefined;
    const trimmed = `${value}`.trim();
    return trimmed === '' ? undefined : trimmed;
};

export const createMovieForm = ({
    initialMovie = {},
    submitLabel = 'Enviar',
    requireTitle = false,
    onSubmit,
} = {}) => {
    const form = document.createElement('form');
    form.className = 'movie-form';

    form.innerHTML = `
        <div class="form-grid">
            <label class="field">
                <span class="field__label">Título</span>
                <input name="title" type="text" placeholder="The Matrix" />
            </label>

            <label class="field">
                <span class="field__label">Género</span>
                <input name="genre" type="text" placeholder="Sci-Fi" />
            </label>

            <label class="field">
                <span class="field__label">Año</span>
                <input name="year" type="number" placeholder="1999" />
            </label>

            <label class="field">
                <span class="field__label">Rating</span>
                <input name="rating" type="number" step="0.1" placeholder="4.5" />
            </label>

            <label class="field field--full">
                <span class="field__label">Poster (URL)</span>
                <input name="poster" type="url" placeholder="https://..." />
            </label>
        </div>

        <div class="form-actions">
            <button type="submit" class="btn primary">${submitLabel}</button>
            <span class="form-hint">Campos vacíos no se envían.</span>
        </div>
    `;

    const titleEl = form.querySelector('input[name="title"]');
    const genreEl = form.querySelector('input[name="genre"]');
    const yearEl = form.querySelector('input[name="year"]');
    const ratingEl = form.querySelector('input[name="rating"]');
    const posterEl = form.querySelector('input[name="poster"]');

    titleEl.required = requireTitle;

    const setMovie = (movie = {}) => {
        titleEl.value = movie.title ?? '';
        genreEl.value = movie.genre ?? '';
        yearEl.value = movie.year ?? '';
        ratingEl.value = movie.rating ?? '';
        posterEl.value = movie.poster ?? '';
    };

    const getMovie = () => {
        const payload = {
            title: cleanOrUndefined(titleEl.value),
            genre: cleanOrUndefined(genreEl.value),
            poster: cleanOrUndefined(posterEl.value),
            year: toNumberOrUndefined(yearEl.value),
            rating: toNumberOrUndefined(ratingEl.value),
        };

        return Object.fromEntries(Object.entries(payload).filter(([, value]) => value !== undefined));
    };

    const setDisabled = (disabled) => {
        Array.from(form.elements).forEach((el) => {
            el.disabled = Boolean(disabled);
        });
    };

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (typeof onSubmit !== 'function') return;

        setDisabled(true);
        try {
            await onSubmit(getMovie());
        } finally {
            setDisabled(false);
        }
    });

    setMovie(initialMovie);

    return { root: form, getMovie, setMovie, setDisabled };
};
