import './MovieCard.css';

export const createMovieCard = (movie) => {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.innerHTML = `
        <div class="card-image">
            <img src="${movie.poster}" alt="${movie.title}" loading="lazy">
            <span class="rating">★ ${movie.rating}</span>
        </div>
        <div class="card-content">
            <div class="card-header">
                <span class="genre-tag">${movie.genre}</span>
                <span class="year">${movie.year}</span>
            </div>
            <h3>${movie.title}</h3>
            <button class="details-btn">Ver Detalles</button>
        </div>
    `;
    return card;
};