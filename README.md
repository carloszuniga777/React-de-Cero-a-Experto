# Prácticas de React

Este repositorio alberga varios proyectos pequeños de práctica realizados con React. 
A continuación se encuentran los proyectos disponibles hasta el momento.

---
## Proyectos

### 1. [GifExportApp](https://giftexpertapp-practice.netlify.app/)
- **Descripción**: GifExportApp es una aplicación que permite buscar y ver GIFs de una variedad de categorías. Utiliza la API de Giphy para realizar las búsquedas.


 ### 2. [HeroApp](https://heroesapp-react-spa.netlify.app/) 
 - **Descripción**: Esta aplicación implementa diversas características avanzadas de enrutamiento y funcionalidades utilizando React y React Router.

**Características Principales**:

1. Rutas Públicas y Privadas
2. Protección de Rutas
3. Rutas Dinámicas 
4. Almacenamiento de Última Página Visitada
5. Sistema de Búsqueda

### 3. [JournalApp](https://journalappreact.vercel.app/auth/login)
 - **Descripción**: Es una aplicación diseñada para crear y organizar entradas de diario personalizadas. Permite escribir notas detalladas y enriquecerlas con imaganes.

-**Características Principales**:
1. **Autenticación y Registro**: 
    - Login y registro de usuarios mediante Firebase Authentication, con opciones de correo electrónico y Google.
    - Protección de rutas privadas (solo accesibles tras autenticación) y públicas (Login y registro de usuarios).

2. **Gestion de Contenido**:
   - Creación de notas con texto enriquecido y adjuntar imágenes almacenadas en Cloudinary
   - Almacenamiento de entradas en Firestore (Firebase) para consultas rápidas y escalables.

3. **API RESTFUL**:
    - Endpoints para operaciones CRUD (crear, leer, actualizar, eliminar) de notas, integrado con la autenticación de Firebase y almacenamiento de imagenes con Cloudinary 

4. **Tecnologías Clave:**
    - **Frontend**: React, Redux Toolkit, Material UI
    - **Backend**: Firebase
    - **Herramientas**: Postman, Git


### 4. [CalendarApp](https://react-calendar-backend-i68e.onrender.com/)

- **Descripción**: Es una aplicación web full-stack arquitectura MVC desarrollada con el stack MERN (MongoDB, Express.js, React y Node.js) que ofrece una solución completa para la gestión y visualización de eventos en un calendario interactivo. Con un enfoque en la experiencia del usuario y la seguridad, proporciona herramientas modernas para organizar tus compromisos de manera eficiente.

🌟**Características Principales**:
1. 🔐 **Autenticación y Registro**:
    - **Autenticación  Json Web Token (JWT)** con tokens de refresco para mayor seguridad
    - Registro de usuarios de nuevos usuarios
    - **Protección de rutas** tanto en frontend como backend
    - Cifrado de contraseñas con **bcrypt.js**
    - Manejo de sesiones persistentes con localStorage


2. 📅 **Gestión de Eventos**:
    - **Calendario interactivo** con vista mensual/semanal
    - **CRUD completo de eventos** (Crear, Leer, Actualizar, Eliminar)
    - **Redux** para la gestión de estados del calendario 

3. ⚙️ **API RESTful:**
    - Arquitectura MVC con **Node.js** y **Express.js**
    - **Endpoints REST** para todas las operaciones de calendario
    - Validación de datos con **Express-Validator**
    - Manejo centralizado de errores
    - Integración con **MongoDB Atlas** para almacenamiento en la nube
    - Sistema de paginación para grandes conjuntos de datos

4. 🛠 **Tecnologías Clave:**
    - **Frontend**: React, Redux Toolkit, React Big Calendar, Axios, Bootstrap
    - **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT
    - **Herramientas**: Postman, Git
    - **DevOps**: MongoDB Atlas

---

Este repositorio servirá como una colección de proyectos y ejemplos prácticos para mejorar y aplicar habilidades con React. Mantendré actualizada la lista de proyectos conforme avance en mis prácticas.

