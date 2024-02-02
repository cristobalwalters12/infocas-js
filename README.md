# Proyecto FullStack con Vue.js y NestJS: Sistema de Monitoreo de Sensores

Este proyecto ofrece una solución completa de monitoreo de sensores, con un backend construido en Express y MySQL y un frontend que permite visualizar gráficos basados en los datos recopilados.

## Backend: API para Sistema de Sensores

El backend está diseñado con Express, proporcionando una API robusta para interactuar con la base de datos de sensores.

### Características:

- **Autenticación y Autorización**: Uso de JSON Web Tokens (JWT) para asegurar y validar las solicitudes.
- **Manejo de Errores**: Registro robusto y manejo de errores inesperados.
- **Límite de Tasa de Solicitudes**: Protección contra ataques de fuerza bruta limitando el número de solicitudes por usuario.
- **Configuración CORS**: Limita las solicitudes solo a orígenes permitidos.
- **Interacción con Base de Datos**: Consultas optimizadas a MySQL para recuperar y almacenar información de sensores y usuarios.

### Requisitos previos:
- Node.js
- MySQL
- npm

## Frontend: Visualizador de Gráficos de Temperatura y Humedad

El frontend, construido con Vue.js y Vuetify, ofrece una experiencia interactiva y visual para el monitoreo de sensores.

### Características:

- **Visualización Dinámica de Datos**: Gráficos interactivos que muestran temperatura y humedad basados en datos de sensores.
- **Selección de Sensores**: Menú desplegable para seleccionar y visualizar datos de sensores específicos.
- **Filtrado por Fecha y Hora**: Opción para visualizar datos basados en un rango de tiempo específico.

### Tecnologías Utilizadas:

- **Vue.js**: Marco de trabajo JavaScript reactivo.
- **Vuetify**: Biblioteca de componentes de UI para Vue.
- **Axios**: Librería para realizar peticiones HTTP.
- **Moment.js**: Herramienta para el manejo y formateo de fechas.
- **Vuex**: Sistema de gestión de estado para Vue.js.
-  **Chart.js**: para visualizacion de graficos
-  **Vue Router**: navegacion entre rutas en Vue

---
