# CalendarAPP 📅

![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white) ![react-big-calendar](https://img.shields.io/badge/react--big--calendar-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white) ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) ![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white)

[![Licencia](https://img.shields.io/badge/Licencia-MIT-blue.svg)](https://opensource.org/licenses/MIT) [![Versión](https://img.shields.io/badge/Versión-1.0.0-brightgreen.svg)]()

---

Una aplicación de calendario que te permite programar y visualizar tus tareas de forma intuitiva. Con CalendarAPP puedes crear y gestionar eventos en un calendario interactivo, además de acceder de manera segura mediante un sistema de autenticación de usuarios.

---
### Vista previa en producción
¡Echa un vistazo a la versión en vivo del sitio web! [Ver demostración en vivo](https://react-calendar-backend-i68e.onrender.com/).

 **Observación:**
La primera vez que acceda a la URL del proyecto, es posible que experimente una demora en la carga. Esto ocurre porque nuestro servidor en Render desactiva el proyecto automáticamente cuando no está en uso. El tiempo de reactivación puede tomar unos minutos. Agradecemos su paciencia mientras el sistema se pone en marcha nuevamente

---

## Características ✨

- **Programación de Tareas:** Permite crear, editar y eliminar eventos en el calendario.
- **Vista Calendario:** Utiliza una interfaz visual y amigable para mostrar los eventos programados.
- **Autenticación:** Sistema de login y registro de usuarios para garantizar la seguridad de los datos.
- **Gestión de Estados:** Manejo eficiente de estados con Redux Toolkit para la autenticación y la gestión de eventos.

## Tecnologías Utilizadas 💻

### Frontend

-  **[Vite](https://vitejs.dev/)** 🚀: Herramienta de desarrollo ultrarrápida para construir aplicaciones modernas.

-  **[React](https://reactjs.org/)** ⚛️: Biblioteca de JavaScript para construir interfaces de usuario.

-  **[Bootstrap](https://getbootstrap.com/)** 🎨:  Framework CSS para diseño responsivo y componentes predefinidos.

- **[react-big-calendar](https://github.com/jquense/react-big-calendar)** 📆: Componente de calendario interactivo para visualizar eventos.

- **[Axios](https://axios-http.com/)** 🔗: Cliente HTTP para realizar peticiones a APIs.

- **[React Router](https://reactrouter.com/)** 🛣️: Manejo de rutas y navegación en aplicaciones React.

### Gestión de Estados

- **[Redux Toolkit](https://redux-toolkit.js.org/)** 📦: Biblioteca para la administración del estado global, incluyendo autenticación y eventos del calendario.

---

## Instalación y Configuración ⚙️

### Clonar el Repositorio

```bash
git clone https://github.com/carloszuniga777/React-de-Cero-a-Experto.git

cd 08-calendar-frontend
```


## Instalación de Dependencias

```bash
  pnpm install
```

## Configuración de Variables de Entorno

- Renombra el archivo `env.template` a `.env.production` en el directorio correspondiente.

- Modifica las variables de entorno según sea necesario. Por ejemplo, asegúrate de definir la URL de la API:

```env
VITE_API_URL= http://url-end-point-de-aplicacion-backend/api
```

Esta url es la de los endpoint del backend de node una vez cargado en produccion

## Ejecución de la Aplicación

#### En Modo Desarrollo

```bash
    pnpm run dev
```

#### En Modo Producción 

```bash
    pnpm start
```
---
## Desplegar nuevos cambios en el Front End a Produccion

#### Para desplegar los nuevos cambios es necesario:

Hacer el `build` de la aplicacion de React: 
```bash
  pnpm run build
```
Se genera una carpeta automaticamente llamada `dist`, en dicha carpeta copiar los archivos `assets` `index.html` y cualquier otro archivo que se encuentre y pegarlos esos archivos en la carpeta `public` de la aplicacion backend `08-calendar-frontend`

No es necesario configurar en el servidor la variable de entorno para realizar los fetch `VITE_API_URL`

---
## Contribuciones 🤝

Si deseas contribuir al proyecto:

- Haz un fork del repositorio.

- Crea una rama con la nueva funcionalidad: `git checkout -b feature/nueva-funcionalidad`

- Realiza los cambios y haz commit: `git commit -m 'Añadir nueva funcionalidad'`

- Sube tus cambios a tu fork: `git push origin feature/nueva-funcionalidad`

- Abre un Pull Request en el repositorio original.

## Licencia  📄
Este proyecto está bajo la Licencia MIT.