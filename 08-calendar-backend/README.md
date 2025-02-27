# Calendar BackEnd 🗓️

[![Licencia](https://img.shields.io/badge/Licencia-MIT-blue.svg)](https://opensource.org/licenses/MIT)

[![Versión](https://img.shields.io/badge/Versión-1.0.0-brightgreen.svg)]()

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green)](https://nodejs.org/)

[![Express](https://img.shields.io/badge/Express-4.x-blue)](https://expressjs.com/)

[![MongoDB](https://img.shields.io/badge/MongoDB-6.x-green)](https://www.mongodb.com/)

Backend para aplicación de calendario con sistema de autenticación JWT y gestión de eventos. Proporciona una API RESTful para operaciones CRUD de eventos calendarizados y gestión de usuarios.

## Características Clave ✨
- 🔐 Autenticación JWT segura
- 👤 Registro y login de usuarios
- 📅 CRUD completo para eventos de calendario
- 🔄 Operaciones RESTful API
- 🛡️ CORS configurado para seguridad
- 🗃️ Persistencia de datos con MongoDB
- 📦 Validación de datos con Mongoose

## Tecnologías Utilizadas 🛠️
![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white)

![Express](https://img.shields.io/badge/-Express-000000?logo=express&logoColor=white)

![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?logo=mongodb&logoColor=white)

![Mongoose](https://img.shields.io/badge/-Mongoose-880000?logo=mongoose&logoColor=white)

![JWT](https://img.shields.io/badge/-JWT-000000?logo=jsonwebtokens&logoColor=white)

![CORS](https://img.shields.io/badge/-CORS-000000?logo=cors&logoColor=white)

## Endpoints Principales 🔌

### Autenticación 🔑
- `POST /api/auth/new` - Registro de nuevos usuarios (Valida: email único, contraseña encriptada) 
- `POST /api/auth` -  Autenticación de usuarios (Retorna JWT con expiración de 2 horas)
- `GET /api/auth/renew` -  Renovar token JWT  
  (Requiere token válido en headers)

### Eventos de Calendario 📅
_Todos requieren header `x-token` válido_

- `GET /api/events` - Obtener todos los eventos del usuario  (Filtrado por usuario autenticado)
- `POST /api/events` - Crear evento  (Valida: fechas, título obligatorio)
- `PUT /api/events/:id` - Actualizar evento  (Validación de campos actualizables)
- `DELETE /api/events/:id` - Eliminar evento   (Borrado lógico con timestamp)

## Instalación ⚙️

#### 1. Clonar repositorio:
```bash
git clone https://github.com/carloszuniga777/React-de-Cero-a-Experto.git

cd React-de-Cero-a-Experto/08-calendar-backend
```

#### 2. Instalar dependencias:
```bash
    pnpm i
```

#### 3. Configurar variables de entorno (.env):

```bash
PORT=4000

DB_CONNECTION=conexion-mongodb/mern_calendar

SECRET_JWT_SEED=tu_secreto_super_seguro

```


#### 4. Iniciar servidor:

  Produccion:

  ```bash
    pnpm start
  ```

  Desarrollo:

  ```bash
    pnpm run dev
  ```  

## Documentación de la API 📚 

Ejemplo de solicitud para crear evento:


`POST /api/events`

```bash
Headers: {
  "Content-Type": "application/json",
  "x-token": "tu_jwt_token"
}
Body: {
  "title": "Reunión importante",
  "start": "2024-03-15T10:00:00",
  "end": "2024-03-15T11:00:00",
  "notes": "Preparar presentación"
}
```

## Variables de Entorno 🌐

| Variable       | Descripción                  | Valor por Defecto       |
|----------------|------------------------------|-------------------------|
| `PORT`         | Puerto del servidor          | `4000` (Puede ser cualquiera que este libre)                  |
| `DB_CONNECTION`  | URL de conexión a MongoDB    | **Requerido**       |
| `JWT_SECRET`   | Secreto para firmar JWT      | **Requerido**           |
| `CORS_ORIGIN`  | Dominios permitidos para CORS|  |



## Contribución 🤝
Haz un fork del proyecto

- Crea tu feature branch (`git checkout -b feature/nueva-funcionalidad`)

- Realiza commit de tus cambios (`git commit -m 'Add some feature'`)

- Push a la rama (`git push origin feature/nueva-funcionalidad`)

- Abre un Pull Request

## Licencia 📄
Este proyecto está bajo la Licencia MIT - ver el archivo LICENSE para más detalles.