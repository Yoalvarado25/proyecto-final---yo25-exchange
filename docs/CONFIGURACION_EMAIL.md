# Configuración de Email (SMTP) en First Exchange

Esta guía explica cómo configurar el envío de emails en la aplicación para que funcionen correctamente los correos de bienvenida, recuperación de contraseña, etc.

## Tabla de Contenidos

1. [¿Necesitas configurar el email?](#necesitas-configurar-el-email)
2. [Opción 1: Mailtrap (Recomendado para desarrollo)](#opción-1-mailtrap-recomendado-para-desarrollo)
3. [Opción 2: Gmail (Para enviar emails reales)](#opción-2-gmail-para-enviar-emails-reales)
4. [Verificar la configuración](#verificar-la-configuración)
5. [Solución de problemas](#solución-de-problemas)

---

## ¿Necesitas configurar el email?

ℹ️ **Para desarrollo local**: La configuración de email es **OPCIONAL**. Si no configuras el SMTP, la aplicación funcionará normalmente pero no enviará emails.

La aplicación envía emails automáticamente en estos casos:
- ✉️ **Registro de usuario**: Email de bienvenida
- 🔒 **Recuperación de contraseña**: Email con token para resetear

Si quieres probar el envío de emails, tienes dos opciones:

---

## Opción 1: Mailtrap (Recomendado para desarrollo)

✅ **Ventajas**: Gratis, fácil, seguro (no envía emails reales)

Mailtrap intercepta todos los emails y te permite verlos en su interfaz web, sin enviarlos realmente. Perfecto para desarrollo.

### Paso 1: Crear cuenta en Mailtrap

1. Ve a: https://mailtrap.io/
2. Crea una cuenta gratuita
3. Ve a **Email Testing → Inboxes → My Inbox**
4. En la pestaña **SMTP Settings**, verás algo como:
   ```
   Host: sandbox.smtp.mailtrap.io
   Port: 2525
   Username: 1a2b3c4d5e6f7g
   Password: 1a2b3c4d5e6f7g
   ```

### Paso 2: Configurar las variables de entorno

Abre tu archivo `.env` y agrega:

```env
# Configuración de Email (Mailtrap)
MAIL_SERVER=sandbox.smtp.mailtrap.io
MAIL_USERNAME=tu-username-de-mailtrap
MAIL_PASSWORD=tu-password-de-mailtrap
```

### Paso 3: Reiniciar el servidor

```bash
# Detén el servidor (Ctrl+C) y vuélvelo a iniciar
pipenv run start
```

### Paso 4: Probar el envío

Registra un usuario y ve a tu inbox de Mailtrap. Verás el email ahí (pero no se enviará realmente).

✅ ¡Listo! Puedes desarrollar sin preocuparte de enviar emails por error.

---

## Opción 2: Gmail (Para enviar emails reales)

⚠️ **Usar solo si necesitas enviar emails reales** (por ejemplo, para pruebas con usuarios reales).

### Paso 1: Crear una Contraseña de Aplicación en Gmail

⚠️ **Importante**: NO uses tu contraseña normal de Gmail. Debes crear una "contraseña de aplicación".

#### 1.1. Activar la verificación en 2 pasos

1. Ve a tu cuenta de Google: https://myaccount.google.com/
2. En el menú izquierdo, haz clic en **Seguridad**
3. En "Cómo inicias sesión en Google", haz clic en **Verificación en dos pasos**
4. Sigue los pasos para activarla (si no la tienes activa)

#### 1.2. Generar una contraseña de aplicación

1. Ve a: https://myaccount.google.com/apppasswords
2. En "Seleccionar app", elige **Correo**
3. En "Seleccionar dispositivo", elige **Otro (nombre personalizado)**
4. Escribe: `First Exchange` o `Flask App`
5. Haz clic en **Generar**
6. Gmail te mostrará una contraseña de 16 caracteres. **Cópiala** (sin espacios).
   - Ejemplo: `abcd efgh ijkl mnop` → copia: `abcdefghijklmnop`

### Paso 2: Configurar las variables de entorno

Abre tu archivo `.env` y agrega estas líneas:

```env
# Configuración de Email (Gmail)
MAIL_SERVER=smtp.gmail.com
MAIL_USERNAME=tu-email@gmail.com
MAIL_PASSWORD=abcdefghijklmnop
```

Reemplaza:
- `tu-email@gmail.com` → Tu dirección de Gmail
- `abcdefghijklmnop` → La contraseña de aplicación que generaste

### Paso 3: Reiniciar el servidor

```bash
# Detén el servidor (Ctrl+C) y vuélvelo a iniciar
pipenv run start
```

✅ ¡Listo! Ahora tu app puede enviar emails desde tu cuenta de Gmail.

---

## Verificar la configuración

### 1. Verificar las variables de entorno

```bash
# Asegúrate de que las variables estén en tu .env
cat .env | grep MAIL
```

Deberías ver algo como:
```
MAIL_SERVER=smtp.gmail.com
MAIL_USERNAME=tu-email@gmail.com
MAIL_PASSWORD=abcdefghijklmnop
```

### 2. Probar el registro de usuario

```bash
curl -X POST http://localhost:3001/users/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "test_user",
    "email": "test@ejemplo.com",
    "password": "test123",
    "dni": "12345678",
    "country": "Argentina"
  }'
```

Si funciona, deberías ver:
```json
{
  "msg": "User created"
}
```

Y deberías recibir un email en `test@ejemplo.com` (o verlo en Mailtrap si usas esa opción).

### 3. Ver los logs del servidor

En la consola donde corre tu servidor Flask, deberías ver:
```
✅ Email de bienvenida enviado a test@ejemplo.com
```

O un error específico si algo falló.

---

## Solución de problemas

### El registro funciona pero no se envía email

✅ **Esto es normal**: La aplicación está configurada para continuar aunque falle el envío de email.

- Revisa los logs del servidor (la consola donde corre Flask)
- Deberías ver: `⚠️  No se pudo enviar email de bienvenida: [error]`
- Si quieres que los emails funcionen, configura Mailtrap o Gmail según las instrucciones arriba

### Error con Gmail: `Username and Password not accepted`

**Causa**: Credenciales incorrectas.

**Solución**:
1. Asegúrate de usar una **contraseña de aplicación**, no tu contraseña normal de Gmail
2. Verifica que la verificación en 2 pasos esté activa
3. Genera una nueva contraseña de aplicación en https://myaccount.google.com/apppasswords

### Error con Mailtrap: `Connection refused`

**Solución**:
1. Verifica que copiaste correctamente el `MAIL_SERVER`, `MAIL_USERNAME` y `MAIL_PASSWORD`
2. Asegúrate de que sean las credenciales de **SMTP** (no las de la API)
3. Reinicia el servidor después de editar `.env`

---

## Ejemplo completo de `.env`

**Con Mailtrap (desarrollo):**
```env
# Email Configuration (Mailtrap)
MAIL_SERVER=sandbox.smtp.mailtrap.io
MAIL_USERNAME=tu-username-de-mailtrap
MAIL_PASSWORD=tu-password-de-mailtrap
```

**Con Gmail (emails reales):**
```env
# Email Configuration (Gmail)
MAIL_SERVER=smtp.gmail.com
MAIL_USERNAME=tu-email@gmail.com
MAIL_PASSWORD=tu-contraseña-de-aplicacion-gmail
```

---

## Recomendaciones

- 👨‍💻 **Desarrollo local**: Usa **Mailtrap** o no configures nada (la app funcionará igual)
- 📧 **Si necesitas emails reales**: Usa **Gmail**
- 🚀 **Producción**: Considera usar servicios profesionales como SendGrid o Mailgun para mejor deliverability

---

## Recursos Adicionales

- [Mailtrap - Email Testing](https://mailtrap.io/email-testing)
- [Generar contraseña de aplicación en Gmail](https://support.google.com/accounts/answer/185833)
- [Documentación de Flask-Mail](https://pythonhosted.org/Flask-Mail/)

---

**¿Necesitas ayuda?** Revisa los logs del servidor (consola donde corre Flask) para ver mensajes específicos sobre el envío de emails.
