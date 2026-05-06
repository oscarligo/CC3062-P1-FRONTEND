const DEFAULT_BASE_URL = 'http://localhost:8080'

function getBaseUrl() {
  const fromEnv = import.meta?.env?.VITE_API_BASE_URL
  return (fromEnv && String(fromEnv).trim()) || DEFAULT_BASE_URL
}

async function requestJson(path, options = {}) {
  const baseUrl = getBaseUrl()
  const url = new URL(path, baseUrl)

  const response = await fetch(url, {
    ...options,
    headers: {
      Accept: 'application/json',
      ...(options.headers ?? {}),
    },
  })

  const contentType = response.headers.get('content-type')
  const isJson = contentType?.includes('application/json')
  const body = isJson ? await response.json() : await response.text()

  if (!response.ok) {
    const message =
      typeof body === 'string'
        ? body
        : body?.message || body?.error || response.statusText

    throw new Error(`HTTP ${response.status}: ${message}`)
  }

  return body
}

function normalizeMoviesPayload(payload) {
  if (Array.isArray(payload)) return payload
  if (payload && Array.isArray(payload.data)) return payload.data
  if (payload && Array.isArray(payload.movies)) return payload.movies
  return null
}

export async function getMovies() {
  const payload = await requestJson('/movies')
  const movies = normalizeMoviesPayload(payload)

  if (!movies) {
    throw new Error('Respuesta inesperada de la API (se esperaba un arreglo de películas).')
  }

  return movies
}
