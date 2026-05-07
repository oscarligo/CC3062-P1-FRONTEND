const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080').replace(/\/+$/, '');
const MOVIES_URL = `${API_BASE_URL}/movies`;

/*

MOVIES SERVICE

This module provides functions to interact with the movies API, including fetching all movies,
fetching a movie by ID, creating a new movie, updating an existing movie, and deleting a movie. 
Each function uses a common request helper that handles HTTP requests and responses, 
including error handling and response parsing.
*/


const request = async (url, { method = 'GET', body, headers } = {}) => {
    const response = await fetch(url, {
        method,
        headers: {
            ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
            ...(headers || {}),
        },
        body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    const contentType = response.headers.get('content-type') || '';
    const isJson = contentType.includes('application/json');

    let data = null;
    if (response.status !== 204) {
        data = isJson ? await response.json().catch(() => null) : await response.text().catch(() => null);
    }

    if (!response.ok) {
        const message =
            (data && typeof data === 'object' && typeof data.message === 'string' && data.message) ||
            (typeof data === 'string' && data) ||
            `HTTP ${response.status} ${response.statusText}`;

        const error = new Error(message);
        error.status = response.status;
        error.data = data;
        throw error;
    }

    return data;
};

export const getMovies = async () => request(MOVIES_URL);

export const getMovieById = async (id) => {
    if (id === undefined || id === null || `${id}`.trim() === '') {
        throw new Error('ID es requerido');
    }
    return request(`${MOVIES_URL}/${encodeURIComponent(id)}`);
};

export const createMovie = async (movie) => request(MOVIES_URL, { method: 'POST', body: movie });

export const updateMovie = async (id, movie) => {
    if (id === undefined || id === null || `${id}`.trim() === '') {
        throw new Error('ID es requerido');
    }
    return request(`${MOVIES_URL}/${encodeURIComponent(id)}`, { method: 'PUT', body: movie });
};

export const deleteMovie = async (id) => {
    if (id === undefined || id === null || `${id}`.trim() === '') {
        throw new Error('ID es requerido');
    }
    return request(`${MOVIES_URL}/${encodeURIComponent(id)}`, { method: 'DELETE' });
};