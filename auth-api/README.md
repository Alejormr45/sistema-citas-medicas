# Auth API

Backend para el proyecto de autenticación (Express + SQLite)

## Requisitos
- Node.js 18+
- npm

## Instalar y ejecutar
1. npm install
2. Crear archivo .env (ejemplo)
3. npm run dev

Endpoints:
- POST /register  { name, email, password } → 201 { token } o 4xx/5xx { error }
- POST /login     { email, password } → 200 { token } o 4xx/5xx { error }
- GET /profile    (Bearer token) → 200 { user } o 401 { error }
