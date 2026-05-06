
# CC3062 — Proyecto 1 (Frontend)

Frontend simple para ver información de **Películas**, consumiendo una **API REST**.

Repositorio con el back-end: <https://github.com/oscarligo/CC3062-P1-BACKEND.git>

## Ejecutar (Vite)

1. Instalar dependencias: `npm install`
2. (Opcional) Configurar API: `cp .env.example .env` y editar `VITE_API_BASE_URL`
3. Levantar en desarrollo: `npm run dev`

## Ejecutar (Docker)

1. `docker compose up --build`
2. Abrir: <http://localhost:3400>



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