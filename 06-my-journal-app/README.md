## Configuración del Proyecto

A continuación, se detallan los pasos necesarios para configurar las variables de entorno requeridas para este proyecto.

---

### 1. Configuración de Variables de Entorno

#### 1.1 Crear un Proyecto en Firebase
- Ingrese a [Firebase](https://console.firebase.google.com/) y cree un nuevo proyecto.

- Una vez creado el proyecto, selecciónelo y vaya a la **sección de configuración del proyecto** en la pestaña **General**.

- En esta sección, encontrará los IDs correspondientes a la **API Key** y otra información necesaria para la configuración.

#### 1.2 Crear un Archivo `.env`
- En la raíz de su proyecto, cree un archivo llamado `.env`.

- Agregue las siguientes variables al archivo `.env` y sustitúyalas con los valores proporcionados por Firebase:

```env
VITE_FIREBASE_APIKEY            = "Api"
VITE_FIREBASE_AUTH_DOMAIN       = "authDomain"
VITE_FIREBASE_PROJECT_ID        = "projectId"
VITE_FIREBASE_STORAGE_BUCKET    = "storageBucket"
VITE_FIREBASE_MESSAGINGSENDERID = "messagingSenderId"
VITE_FIREBASE_APP_ID            = "appId"