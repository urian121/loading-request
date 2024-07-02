# Loading Request

[![npm version](https://img.shields.io/npm/v/loading-request.svg?style=flat-square)](https://www.npmjs.com/package/loading-request)
[![License](https://img.shields.io/github/license/yourusername/loading-request.svg)](https://github.com/yourusername/loading-request/blob/main/LICENSE)

Un paquete para mostrar indicadores de carga durante solicitudes o procesos en aplicaciones web compatibles con varios frameworks como React, Vue, Angular, Svelte, etc.

## Instalación

Puedes instalar el paquete utilizando npm:

```bash
npm install loading-request

o usando yarn:
yarn add loading-request
```

#### Ejemplo practico en React.js

    import { showLoading, hideLoading } from 'loading-request';
    import 'loading-request/dist/index.cjs.css';

    const App = () => {
    const handleShowLoading = () => {
        showLoading('Cargando...');
        hideLoading(600);
    };

    return (
        <>
        <button onClick={handleShowLoading}>Mostrar Carga</button>
        </>
    );
    };

    export default App;

## API

#### showLoading(message: string)

    Muestra un indicador de carga con un mensaje opcional.

        message: Mensaje que se muestra junto al indicador de carga. Opcional, por defecto es "Loading...".

    hideLoading(timeLoading: number)

    Oculta el indicador de carga después de un tiempo especificado.

        timeLoading: Tiempo en milisegundos antes de ocultar el indicador. Opcional, por defecto es 400ms.

### Contribuir

    Si encuentras algún problema o tienes una idea para mejorar el paquete, por favor abre un issue o envía un pull request en GitHub: https://github.com/urian123/loading-request

### Licencia

### Desarrollador

Urian Viera (https://github.com/urian123)
Web (https://urianviera.com/)
Email: urian1213viera@gmail.com
