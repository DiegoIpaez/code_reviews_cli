# Code Reviews CLI

Este proyecto es una herramienta de línea de comandos (CLI) para registrar revisiones de Pull Requests (PR) en un Google Sheet, facilitando el seguimiento y documentación de revisiones de código en equipos de desarrollo.

## Características
- Solicita la URL de un Pull Request y obtiene automáticamente información relevante desde GitHub.
- Permite ingresar datos manuales adicionales como fecha de revisión y notas.
- Registra la información en una hoja de cálculo de Google Sheets.
- Clasifica automáticamente el tipo de tarea según el nombre de la rama.

## Requisitos
- Node.js >= 16
- Acceso a una cuenta de Google con permisos para editar la hoja de cálculo.
- Archivo de credenciales de Google Sheets (`google-sheet-credential.json`).

## Instalación
1. Clona este repositorio:
   ```bash
   git clone <url-del-repo>
   cd code_reviews_cli
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura las credenciales de Google Sheets:
   - Descarga el archivo `google-sheet-credential.json` y colócalo en la raíz del proyecto.
   - Configura el ID de la hoja de cálculo y el nombre del revisor en `src/constants/index.js`.

## Uso
Ejecuta el CLI con:
```bash
node src/index.js
```
Sigue las instrucciones en pantalla:
1. Ingresa la URL del Pull Request.
2. Completa los datos manuales solicitados (fecha de revisión, nota).
3. La información se agregará automáticamente a la hoja de cálculo.

## Estructura del Proyecto
- `src/`
  - `index.js`: Punto de entrada principal del CLI.
  - `constants/`: Configuraciones y constantes.
  - `lib/`: Clientes para Google Sheets y Axios.
  - `services/`: Lógica para obtener información de PRs.
  - `utils/`: Utilidades para parseo, formato y prompts.
- `google-sheet-credential.json`: Credenciales de Google API.
- `package.json`: Dependencias y scripts.

## Licencia
MIT
