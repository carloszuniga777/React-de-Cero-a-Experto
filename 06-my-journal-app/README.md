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
```

#### 1.3 Crear una cuenta en Cloudinary
- Ingrese a [Cloudinary](https://cloudinary.com/) 

##### 1.3.1 En el Archivo `.env`
- Agregue las siguientes variables de entorno:

```env
 VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
 VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

- **your_cloud_name:** Es el Cloud Name obtenido en la seccion del Dashboard de Cloudinary
- **your_upload_preset:** Es el Preset obtenido en la seccion configuraciones --> subir, es necesario crear un nuevo preset y configurarlo en modo: Unsigned y ponerle un nombre tanto para el preset como al Asset Folder, el nombre que se le de al preset es el que va a utilizar como variable de entorno VITE_CLOUDINARY_UPLOAD_PRESET  

