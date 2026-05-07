
/**
 * Component to display API results in a structured format, showing status and response data.
 */


export const createApiResult = ({ title = 'Resultado' } = {}) => {
    const root = document.createElement('section');
    root.className = 'api-result';

    root.innerHTML = `
        <div class="api-result__header">
            <h2 class="api-result__title"></h2>
            <span class="api-result__status" data-status></span>
        </div>
        <pre class="api-result__body" data-body></pre>
    `;

    root.querySelector('.api-result__title').textContent = title;

    const statusEl = root.querySelector('[data-status]');
    const bodyEl = root.querySelector('[data-body]');

    const clear = (message = '') => {
        statusEl.textContent = '';
        statusEl.className = 'api-result__status';
        bodyEl.textContent = message;
    };

    const set = ({ data, error, statusLabel } = {}) => {
        if (error) {
            statusEl.textContent = statusLabel || 'Error';
            statusEl.className = 'api-result__status is-error';

            // Attempt to extract useful information from the error object
            const errorPayload = {
                message: error.message,
                status: error.status,
                data: error.data,
            };

            bodyEl.textContent = JSON.stringify(errorPayload, null, 2);
            return;
        }

        statusEl.textContent = statusLabel || 'OK';
        statusEl.className = 'api-result__status is-success';

        if (data === undefined || data === null || data === '') {
            bodyEl.textContent = '';
            return;
        }

        bodyEl.textContent = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
    };

    clear('Ejecuta una acción para ver el resultado...');

    return { root, set, clear };
};
