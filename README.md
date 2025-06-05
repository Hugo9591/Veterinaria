# APV - Administrador de Pacientes Veterinaria
Proyecto Fullstack, administra pacientes en una clínica veterinaria y ademas permite a los veterinarios autenticarse de manera segura, 
editar su perfil, registrar, editar y eliminar pacientes.

## Funcionalidades principales
-  Autenticación de usuarios
Registro con validación de email mediante token
Login y recuperación de contraseña con token

- Gestión de pacientes
Crear, editar y eliminar pacientes (nombre, dueño, email, fecha, síntomas) los datos se almacenan en MongoDB

- Perfil del veterinario
Modificar nombre, email, teléfono y sitio web y tambien se puede cambiar la contraseña actual por una nueva

- Validación y alertas
Todos los formularios están validados y muestra mensajes de error o éxito según la acción
Visualmente atractivo con Tailwind

## Tecnologías usadas
- General
React – Librería para construir interfaces de usuario
JavaScript – Lenguaje base del proyecto
Tailwind CSS – Framework de estilos
Node.js – Entorno para ejecutar JavaScript del lado del servidor
MongoDB – Base de datos 
Postman – Herramienta para probar y enviar peticiones http a APIs

## Dependencias
### Backend
Express – Framework para crear la API
Nodemon – Recarga automática del servidor en desarrollo
Mongoose – Modelado de objetos para MongoDB
Dotenv – Manejo de variables de entorno
Bcrypt – Hash de contraseñas
JSON Web Token (JWT) – Autenticación basada en tokens
CORS – Permite peticiones entre distintos dominios
Nodemailer – Envío de correos electrónicos (usado con Mailtrap)

### Frontend
React Router DOM – Enrutamiento entre páginas/componentes
Axios – Cliente HTTP para hacer peticiones al backend

## Instalación y ejecución

1. Clonar el repositorio
  git clone https://github.com/Hugo9591/Veterinaria.git
2. Instalar Dependencias
   - Backend
     npm install
    
    - Frontend
      - npm install
3. Ejecutar entorno de desarrollo
   - Backend
     npm run dev
     
   - Frontend
     npm run dev
