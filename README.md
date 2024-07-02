# Universal Loading

[![npm version](https://img.shields.io/npm/v/universal-loading.svg?style=flat-square)](https://www.npmjs.com/package/universal-loading)
[![License](https://img.shields.io/github/license/yourusername/universal-loading.svg)](https://github.com/yourusername/universal-loading/blob/main/LICENSE)

Un paquete universal para mostrar indicadores de carga (spinners) en aplicaciones web compatibles con diferentes frameworks como React, Vue, Angular, Svelte, entre otros.

## Instalación

Puedes instalar el paquete utilizando npm:

```bash
npm install universal-loading

o usando yarn:
yarn add universal-loading
```

#### Ejemplo practico en React

    import { showLoading, hideLoading } from 'universal-loading';
    import 'universal-loading/dist/index.cjs.css';

    const App = () => {
    const handleShowLoading = () => {
        showLoading('Cargando...');
        setTimeout(() => {
        hideLoading();
        }, 1500);
    };

    return (
        <>
        <button onClick={handleShowLoading}>Mostrar Carga</button>
        </>
    );
    };

    export default App;
