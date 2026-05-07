import './style.css';

import { createListMoviesScreen } from './components/screens/ListMoviesScreen.js';
import { createGetMovieByIdScreen } from './components/screens/GetMovieByIdScreen.js';
import { createCreateMovieScreen } from './components/screens/CreateMovieScreen.js';
import { createUpdateMovieScreen } from './components/screens/UpdateMovieScreen.js';
import { createDeleteMovieScreen } from './components/screens/DeleteMovieScreen.js';

// Main application entry point. It sets up the navigation and renders the appropriate screen based on user interaction.


// Define the available screens in the application, each with a unique key.
const SCREENS = [
    { key: 'list', label: 'GET /movies', build: createListMoviesScreen },
    { key: 'getById', label: 'GET /movies/{id}', build: createGetMovieByIdScreen },
    { key: 'create', label: 'POST /movies', build: createCreateMovieScreen },
    { key: 'update', label: 'PUT /movies/{id}', build: createUpdateMovieScreen },
    { key: 'delete', label: 'DELETE /movies/{id}', build: createDeleteMovieScreen },
];
// Initialize the application by rendering the navigation and the default screen.
const init = () => {
    const appEl = document.getElementById('app');
    const navEl = document.getElementById('app-nav');

    if (!appEl) throw new Error('No se encontró #app');
    if (!navEl) throw new Error('No se encontró #app-nav');

    // Function to render a specific screen based on its key. 
    const render = (key) => {
        const screen = SCREENS.find((s) => s.key === key) || SCREENS[0];

        appEl.innerHTML = '';
        appEl.appendChild(screen.build());

        Array.from(navEl.querySelectorAll('button[data-screen]')).forEach((btn) => {
            btn.classList.toggle('is-active', btn.dataset.screen === screen.key);
        });
    };

    navEl.innerHTML = '';

    // Create navigation buttons for each screen and set up click handlers to render the corresponding screen when clicked.
    SCREENS.forEach((screen) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'btn';
        btn.dataset.screen = screen.key;
        btn.textContent = screen.label;
        btn.addEventListener('click', () => render(screen.key));
        navEl.appendChild(btn);
    });

    render(SCREENS[0].key);
};

document.addEventListener('DOMContentLoaded', init);