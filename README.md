
# CC3062 — Proyecto 1 (Frontend)

Frontend simple para ver información de **Películas**, consumiendo una **API REST**.

Repositorio con el back-end: <https://github.com/oscarligo/CC3062-P1-BACKEND.git>


### Requisitos para levantar.

1. Docker y Docker Compose
2. Copiar .env.example a un .env local
3. En la raíz del proyecto levantar con:

``` shell
docker compose up --build 
```

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