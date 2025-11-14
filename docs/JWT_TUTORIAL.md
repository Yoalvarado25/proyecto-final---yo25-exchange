# Tutorial: Autenticación JWT en First Exchange

Este tutorial explica cómo obtener un token JWT (JSON Web Token) y usarlo para acceder a los endpoints protegidos de la aplicación.

## Tabla de Contenidos

1. [Requisitos Previos](#requisitos-previos)
2. [Configuración Inicial](#configuración-inicial)
3. [Crear un Usuario](#crear-un-usuario)
4. [Obtener un Token JWT (Login)](#obtener-un-token-jwt-login)
5. [Usar el Token en Endpoints Protegidos](#usar-el-token-en-endpoints-protegidos)
6. [Renovar el Token (Refresh)](#renovar-el-token-refresh)
7. [Ejemplos Completos](#ejemplos-completos)

---

## Requisitos Previos

- Aplicación Flask corriendo (por defecto en `http://localhost:3001`)
- Cliente HTTP como `curl`, Postman, o Thunder Client
- (Opcional) Una cuenta de usuario creada en la aplicación

---

## Configuración Inicial

### 1. Configurar Variables de Entorno

Asegúrate de que tu archivo `.env` contenga la clave secreta para JWT:

```env
JWT_SECRET_KEY="tu-clave-secreta-aqui"
```

⚠️ **Importante**: Nunca compartas esta clave ni la subas a repositorios públicos.

### 2. Iniciar el Backend

```bash
pipenv install
pipenv run start
```

La API estará disponible en `http://localhost:3001`

---

## Crear un Usuario

Si aún no tienes un usuario, primero debes registrarte.

### Endpoint: `POST /users/`

**Request:**

```bash
curl -X POST http://localhost:3001/users/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "juan_perez",
    "email": "juan@ejemplo.com",
    "password": "miPassword123",
    "dni": "12345678",
    "country": "Argentina"
  }'
```

**Response exitosa:**

```json
{
  "msg": "User created"
}
```

📧 Recibirás un email de bienvenida a la dirección proporcionada.

---

## Obtener un Token JWT (Login)

Una vez que tengas un usuario creado, puedes autenticarte para obtener tu token.

### Endpoint: `POST /users/login`

**Request:**

```bash
curl -X POST http://localhost:3001/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@ejemplo.com",
    "password": "miPassword123"
  }'
```

**Response exitosa:**

```json
{
  "msg": "ok",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY..."
}
```

### Tokens Recibidos

- **`token`** (Access Token): Se usa para autenticar las peticiones. Expira en **30 minutos**.
- **`refresh_token`**: Se usa para obtener un nuevo access token sin volver a hacer login. Expira en **2 días**.

⚠️ Si recibes error 401:
- Verifica que el email y contraseña sean correctos
- Asegúrate de que el usuario esté activo (`is_active=true`)

---

## Usar el Token en Endpoints Protegidos

Los endpoints protegidos requieren que incluyas el token en el header `Authorization` con el formato `Bearer <token>`.

### Ejemplo 1: Obtener tu Perfil

**Endpoint:** `GET /users/profile`

**Request:**

```bash
curl -X GET http://localhost:3001/users/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2U..."
```

**Response:**

```json
{
  "id": 1,
  "username": "juan_perez",
  "email": "juan@ejemplo.com",
  "dni": "12345678",
  "country": "Argentina",
  "score": null,
  "image": null,
  "is_active": true
}
```

### Ejemplo 2: Actualizar tu Perfil

**Endpoint:** `PATCH /users/`

**Request:**

```bash
curl -X PATCH http://localhost:3001/users/ \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "username": "juan_perez_updated",
    "country": "Chile"
  }'
```

**Response:**

```json
{
  "msg": "User updated successfully",
  "user": {
    "id": 1,
    "username": "juan_perez_updated",
    "email": "juan@ejemplo.com",
    "country": "Chile",
    ...
  }
}
```

### Ejemplo 3: Listar Todos los Usuarios

**Endpoint:** `GET /users/`

**Request:**

```bash
curl -X GET http://localhost:3001/users/ \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response:**

```json
[
  {
    "id": 1,
    "username": "juan_perez",
    "email": "juan@ejemplo.com",
    ...
  },
  {
    "id": 2,
    "username": "maria_gomez",
    "email": "maria@ejemplo.com",
    ...
  }
]
```

### Ejemplo 4: Subir una Imagen

**Endpoint:** `POST /users/upload-img`

**Request:**

```bash
curl -X POST http://localhost:3001/users/upload-img \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -F "file=@/ruta/a/tu/imagen.jpg" \
  -F "asAvatar=true"
```

**Response:**

```json
{
  "msg": "ya esta en la nube",
  "imageUrl": "https://res.cloudinary.com/...",
  "public_id": "abc123",
  "avatarUpdated": true
}
```

### Ejemplo 5: Enviar Calificación de la Plataforma (Requiere Token)

**Endpoint:** `POST /api/platform-rating`

**Request:**

```bash
curl -X POST http://localhost:3001/api/platform-rating \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "score": 5
  }'
```

**Response:**

```json
{
  "message": "Rating submitted successfully"
}
```

⚠️ **Nota**: El score debe ser un número entre 1 y 5.

### Ejemplo 6: Obtener Resumen de Calificaciones (Público)

**Endpoint:** `GET /api/platform-rating/summary`

**Request:**

```bash
curl -X GET http://localhost:3001/api/platform-rating/summary
```

ℹ️ **Nota**: Este endpoint **NO requiere autenticación**.

**Response:**

```json
{
  "average": 4.35,
  "distribution": [2, 5, 8, 15, 20]
}
```

Donde `distribution` es un array con el conteo de calificaciones de 1 a 5 estrellas.

### Ejemplo 7: Obtener tu Calificación (Requiere Token)

**Endpoint:** `GET /api/platform-rating/user`

**Request:**

```bash
curl -X GET http://localhost:3001/api/platform-rating/user \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response (si el usuario ha calificado):**

```json
{
  "id": 1,
  "user_id": 123,
  "score": 5,
  "is_active": true,
  "created_at": "2024-01-15T10:30:00"
}
```

**Response (si el usuario NO ha calificado):**

```json
{
  "score": null
}
```

### Ejemplo 8: Actualizar tu Calificación (Requiere Token)

**Endpoint:** `PATCH /api/platform-rating`

**Request:**

```bash
curl -X PATCH http://localhost:3001/api/platform-rating \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "score": 4
  }'
```

**Response:**

```json
{
  "message": "Rating updated successfully"
}
```

---

## Renovar el Token (Refresh)

Cuando tu access token expire (después de 30 minutos), no necesitas volver a hacer login. Puedes usar el refresh token para obtener un nuevo access token.

### Endpoint: `POST /users/refresh`

**Request:**

```bash
curl -X POST http://localhost:3001/users/refresh \
  -H "Authorization: Bearer <tu_refresh_token_aqui>"
```

**Response:**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2U..."
}
```

⚠️ **Nota**: En este endpoint debes usar el **refresh_token**, no el access token.

---

## Ejemplos Completos

### Desde el Frontend (JavaScript/React)

#### Login y Guardar Token

```javascript
const login = async (email, password) => {
  const response = await fetch('http://localhost:3001/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();
  
  if (response.ok) {
    // Guardar tokens en localStorage
    localStorage.setItem('access_token', data.token);
    localStorage.setItem('refresh_token', data.refresh_token);
    return data;
  } else {
    throw new Error(data.msg);
  }
};
```

#### Hacer Peticiones Autenticadas

```javascript
const getProfile = async () => {
  const token = localStorage.getItem('access_token');
  
  const response = await fetch('http://localhost:3001/users/profile', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return await response.json();
};
```

#### Renovar Token Automáticamente

```javascript
const refreshToken = async () => {
  const refreshToken = localStorage.getItem('refresh_token');
  
  const response = await fetch('http://localhost:3001/users/refresh', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${refreshToken}`
    }
  });

  const data = await response.json();
  
  if (response.ok) {
    localStorage.setItem('access_token', data.access_token);
    return data.access_token;
  } else {
    // Token expirado, redirigir al login
    localStorage.clear();
    window.location.href = '/login';
  }
};
```

#### Enviar Calificación de la Plataforma

```javascript
const submitRating = async (score) => {
  const token = localStorage.getItem('access_token');
  
  const response = await fetch('http://localhost:3001/api/platform-rating', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ score })
  });

  return await response.json();
};

// Uso
await submitRating(5); // Calificación de 5 estrellas
```

#### Obtener Resumen de Calificaciones (Sin Token)

```javascript
const getRatingSummary = async () => {
  // No requiere token
  const response = await fetch('http://localhost:3001/api/platform-rating/summary');
  return await response.json();
};

// Uso
const summary = await getRatingSummary();
console.log(`Promedio: ${summary.average}`);
console.log(`Distribución: ${summary.distribution}`);
```

#### Obtener y Actualizar Tu Calificación

```javascript
// Obtener calificación del usuario
const getMyRating = async () => {
  const token = localStorage.getItem('access_token');
  
  const response = await fetch('http://localhost:3001/api/platform-rating/user', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return await response.json();
};

// Actualizar calificación existente
const updateRating = async (newScore) => {
  const token = localStorage.getItem('access_token');
  
  const response = await fetch('http://localhost:3001/api/platform-rating', {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ score: newScore })
  });

  return await response.json();
};
```

### Desde Python

```python
import requests

# Login
response = requests.post(
    'http://localhost:3001/users/login',
    json={'email': 'juan@ejemplo.com', 'password': 'miPassword123'}
)
tokens = response.json()
access_token = tokens['token']

# Usar el token
headers = {'Authorization': f'Bearer {access_token}'}
profile = requests.get(
    'http://localhost:3001/users/profile',
    headers=headers
)
print(profile.json())
```

---

## Endpoints que Requieren Autenticación

A continuación, una lista de los principales endpoints protegidos:

### Endpoints de Usuarios

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/users/` | Listar usuarios activos |
| `GET` | `/users/profile` | Obtener perfil del usuario actual |
| `PATCH` | `/users/` | Actualizar perfil del usuario |
| `DELETE` | `/users/` | Desactivar cuenta del usuario |
| `POST` | `/users/upload-img` | Subir imagen de perfil |
| `GET` | `/users/all` | Listar todos los usuarios (activos e inactivos) |
| `PATCH` | `/users/reactivate` | Reactivar cuenta desactivada |
| `PATCH` | `/users/reset-password` | Cambiar contraseña (requiere token especial) |

### Endpoints de Calificación de Plataforma

| Método | Endpoint | Autenticado | Descripción |
|--------|----------|-------------|-------------|
| `POST` | `/api/platform-rating` | ✅ Sí | Enviar una calificación de la plataforma (1-5) |
| `GET` | `/api/platform-rating/summary` | ❌ No | Obtener resumen de calificaciones (promedio y distribución) |
| `GET` | `/api/platform-rating/user` | ✅ Sí | Obtener la calificación del usuario actual |
| `PATCH` | `/api/platform-rating` | ✅ Sí | Actualizar la calificación del usuario |

---

## Solución de Problemas

### Error 401 Unauthorized

**Causa**: Token inválido, expirado o no proporcionado.

**Soluciones**:
- Verifica que estás usando el header `Authorization: Bearer <token>`
- Comprueba que el token no haya expirado (30 min para access token)
- Intenta renovar el token con el refresh token
- Si nada funciona, haz login nuevamente

### Error 422 Unprocessable Entity

**Causa**: El formato del token es incorrecto.

**Soluciones**:
- Asegúrate de incluir la palabra `Bearer` antes del token
- Verifica que no haya espacios extra en el header
- Comprueba que el token esté completo (sin cortes)

### Error 400 Missing email or password

**Causa**: Falta información en el login.

**Solución**: Asegúrate de enviar tanto `email` como `password` en el body.

---

## Configuración de Expiración

Los tiempos de expiración están configurados en `src/app.py`:

```python
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(minutes=30)  # 30 minutos
app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=2)     # 2 días
```

Si necesitas modificar estos tiempos, edita estos valores según tus necesidades.

---

## Seguridad y Mejores Prácticas

1. **Nunca expongas el JWT_SECRET_KEY**: Mantenlo en el archivo `.env` y fuera del control de versiones.

2. **HTTPS en producción**: Siempre usa HTTPS en producción para evitar que los tokens sean interceptados.

3. **Almacenamiento seguro**: 
   - En el frontend, guarda los tokens en `localStorage` o `sessionStorage`
   - Considera usar cookies `httpOnly` para mayor seguridad

4. **Manejo de refresh tokens**: Implementa lógica para renovar automáticamente el access token antes de que expire.

5. **Logout**: Elimina los tokens del almacenamiento del cliente cuando el usuario cierre sesión.

```javascript
const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  window.location.href = '/login';
};
```

---

## Recursos Adicionales

- [Documentación de Flask-JWT-Extended](https://flask-jwt-extended.readthedocs.io/)
- [JWT.io - Debugger de tokens](https://jwt.io/)
- [README del proyecto](../README.md)

---

**¿Preguntas o problemas?** Consulta el código fuente en `src/api/routes/user_routes.py` o contacta al equipo de desarrollo.
