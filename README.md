
# CC3062 — Proyecto 1 (Frontend)

Frontend con Vanilla JS para ver información de **Películas**, consumiendo una **API REST**.

Repositorio con el back-end: <https://github.com/oscarligo/CC3062-P1-BACKEND.git>

Proyecto funcionando en internet: <http://35.212.219.176>


<img width="1440" height="800" alt="Screenshot 2026-05-06 at 8 27 33 PM" src="https://github.com/user-attachments/assets/4726edc4-700e-47f2-9c97-82b4592c25b2" />

## Challenges Implementados

- Exportar la lista de series a CSV — generado manualmente desde JavaScript, sin librerías. El archivo debe descargarse desde el navegador.


## Reflexión sobre el uso de tecnologías. 

No me resultó tan atractivo desarrollar una aplicación únicamente con JavaScript Vanilla. Me paració que el código era poco escalable y me costó encontrar una guía clara que me permitiera seguir un patrón de diseño y arquitectura eficiente. Aun así, el reto me pareció interesante, ya que me ayudó a comprender mejor el funcionamiento del DOM y a valorar cómo, incluso sin utilizar librerías, JavaScript ofrece herramientas muy útiles para crear aplicaciones completas desde cero.

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
|   └── utils/          # Funciones auxiliares (para crear un CSV)
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
