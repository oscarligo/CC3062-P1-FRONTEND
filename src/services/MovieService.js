const API_URL = import.meta.env.VITE_API_BASE_URL + '/movies';

export const getMovies = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Error al obtener películas');
        return await response.json();
    } catch (error) {
        console.error("Service Error:", error);
        return [];
    }
};