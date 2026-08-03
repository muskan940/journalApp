// Base URL of the Spring Boot backend.
// Set VITE_API_BASE in a .env file to override (see .env.example).
export const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080/journal'

/**
 * Generic fetch wrapper for the backend API.
 * @param {string} path - endpoint path, e.g. '/public/login'
 * @param {object} opts - { method, body, auth, token, onUnauthorized }
 */
export async function api(path, { method = 'GET', body = null, auth = true, token = null, onUnauthorized = null } = {}) {
  const headers = {}
  if (body !== null) headers['Content-Type'] = 'application/json'
  if (auth && token) headers['Authorization'] = 'Bearer ' + token

  const res = await fetch(API_BASE + path, {
    method,
    headers,
    body: body !== null ? JSON.stringify(body) : undefined
  })

  if (res.status === 401 || res.status === 403) {
    if (auth && onUnauthorized) onUnauthorized()
    throw new Error('Unauthorized')
  }

  const contentType = res.headers.get('content-type') || ''
  const data = contentType.includes('application/json')
    ? await res.json().catch(() => null)
    : await res.text().catch(() => '')

  if (!res.ok) throw new Error(typeof data === 'string' ? data : 'Request failed')
  return data
}

/** MongoDB ObjectId can come back as a plain string or { $oid: '...' } depending on backend config. */
export function extractId(idField) {
  if (idField == null) return null
  if (typeof idField === 'string') return idField
  if (idField.$oid) return idField.$oid
  return null
}
