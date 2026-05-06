
# CC3062 — Proyecto 1 (Backend)

Backend  que expone una **API REST ** para gestionar **Películas**.

Repositorio con el back-end: <https://github.com/oscarligo/CC3062-P1-BACKEND.git>



## Estructura del Proyecto

```
project-root/
│
├── index.html          # Entrypoint
├── src/
│   ├── main.js         # Orquestador inicial
│   ├── components/     # Funciones que retornan HTML/Manipulan DOM
│   ├── services/       # Llamadas a API
│   ├── store/          # Estado global
│   └── utils/          # Funciones puras y helpers
├── css/                # Estilos
└── assets/             # imágenes

```



## API REST utilizada: 

Base URL: `http://localhost:8080` (si se ejecuta con los valores por defecto)

### GET /movies
Lista todas las peliculas

### GET /movies/{id}
Obtiene una pelicula por ID

### POST /movies
Crea una pelicula

### PUT /movies/{id}
Actualiza una palicula por ID

### DELETE /movies/{id}
Elimina una pelicula por ID