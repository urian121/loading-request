# Loading Request

[![npm version](https://img.shields.io/npm/v/loading-request.svg?style=flat-square)](https://www.npmjs.com/package/loading-request)
[![GitHub Repo](https://img.shields.io/badge/repository-GitHub-blue?style=flat-square&logo=github)](https://github.com/urian121/loading-request)
[![npm](https://img.shields.io/npm/dt/loading-request.svg)](https://www.npmjs.com/package/loading-request)
[![License](https://img.shields.io/badge/license-ISC-blue.svg?style=flat-square)](https://opensource.org/licenses/ISC)

**Loading Request** es un paquete npm versátil, diseñado para mejorar la experiencia del usuario mostrando indicadores de carga durante solicitudes y procesos asincrónicos en aplicaciones web. Compatible con frameworks populares como React, Vue, Angular, Svelte, Next.js, y Astro, este paquete simplifica la implementación de spinners, barras de progreso y otros indicadores visuales.

## ¿Para qué fue creado?

**Loading Request** facilita la incorporación de indicadores de carga en aplicaciones JavaScript, proporcionando una solución rápida y eficiente para mostrar que una solicitud o proceso está en curso.

## ¿Qué necesidad resuelve?

Este paquete responde a la necesidad de mejorar la usabilidad y percepción del rendimiento en aplicaciones web al proporcionar una visualización clara y atractiva del estado de carga, evitando la incertidumbre del usuario durante procesos asincrónicos.

## Ventajas y Características Clave:

- **Fácil de usar:** Implementa indicadores de carga fácilmente en tu aplicación web con solo unas pocas líneas de código.
- **Compatible con múltiples frameworks:** Funciona sin problemas con React, Vue, Angular, Svelte, Next.js, e incluso con JavaScript nativo a través de CDN.
- **Personalización flexible:** Ajusta colores del spinner y del texto de carga para adaptarse a tu diseño.
- **Integración rápida:** Instalación simple a través de npm o yarn, listo para usar en minutos.
- **Funcionalidad asincrónica:** Soporta operaciones asíncronas como carga de datos, envío de formularios, y navegación entre páginas.
- **Animaciones suaves:** Utiliza animaciones CSS para una experiencia de usuario fluida.
- **Ligero y eficiente:** Minimiza el impacto en el rendimiento de la aplicación.
- **Documentación clara y detallada:** Incluye ejemplos prácticos y documentación completa para facilitar la implementación y configuración.
- **Actualizaciones regulares:** Mantenido activamente con mejoras y actualizaciones periódicas.
- **Licencia abierta:** Publicado bajo licencia ISC, permitiendo su uso en proyectos comerciales y personales sin restricciones.

Con **Loading Request,** puedes ofrecer una experiencia de usuario más fluida y profesional, asegurando que tus aplicaciones web sean visualmente atractivas y funcionales durante la carga de datos.

## Casos de uso:

### Implementar Loading Request en el envío de un formulario

![demo](https://raw.githubusercontent.com/urian121/imagenes-proyectos-github/master/Loading-Request-formulario.gif)

### Implementación de Filtrado Dinámico en Next.js con Loading Request

![demo](https://raw.githubusercontent.com/urian121/imagenes-proyectos-github/master/filtrado-dinamico-con-checkbox-en-Nextjs-y-usando-el-paquete-loading-request.gif)
👉 [Ver Código en GitHub](https://github.com/urian121/filtrado-dinamico-con-checkbox-en-nextjs-y-loading-request)

## Instalación

    $ npm install loading-request --save
    $ yarn add loading-request

## Ejemplo Práctico utilizando React.js

```jsx
import { showLoading, hideLoading } from "loading-request";
import "loading-request/dist/index.css";

const App = () => {
  const handleShowLoading = () => {
    showLoading({
      message: "Cargando...",
      spinnerColor: "#f3752b",
      textLoadingColor: "#EE5E09",
      textLoadingSize: "20px",
    });

    hideLoading({ timeLoading: 1500 });
  };

  return <button onClick={handleShowLoading}>Mostrar Loading</button>;
};

export default App;
```

## Ejemplo Práctico utilizando Next.js

```jsx
"use client";
import { useState } from "react";
import { getSimpson } from "../actions/getSimpson";
import Image from "next/image";

import { showLoading, hideLoading } from "loading-request";
import "loading-request/dist/index.css";

export default function ApiSimpson() {
  const [data, setData] = useState(null);

  const handleGetSimpson = async () => {
    showLoading({ message: "Cargando API..." });
    try {
      const data = await getSimpson();
      setData(data);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    } finally {
      hideLoading();
    }
  };

  return (
    <>
      <button className="my-4" onClick={handleGetSimpson}>
        Obtener personajes
      </button>

      {data && (
        <div className="cards">
          {data.map((personaje, index) => (
            <div key={index} className="card">
              <div>{personaje.character}</div>
              <Image width={200} height={200} src={personaje.image} alt={personaje.character} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
```

## Mostrando Resultados de una API REST en Next.js

![](https://raw.githubusercontent.com/urian121/imagenes-proyectos-github/master/loading-request-con-nextjs.gif)

👉 [Ver Código en GitHub](https://github.com/urian121/loading-request-con-nextjs)

## Ejemplo Práctico utilizando Svelte.js

```svelte
<script>
  import svelteLogo from "./assets/svelte.svg";

  import { showLoading, hideLoading } from "loading-request";
  import "loading-request/dist/index.css";

  let personas = null;
 async function fetchPersonas() {

      showLoading({
          message: "Cargando Solicitud...",
          spinnerColor: "#f3752b",
          textLoadingColor: "#EE5E09",
          textLoadingSize: "18px",
      });

      try {
        const URL = "https://reqres.in/api/users?page=1";
        const response = await fetch(URL);
        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }
        personas = await response.json();
      } catch (err) {
        console.log('Error al cargar la API:', err.message);
      } finally {
        hideLoading();
      }
  }
</script>

<main>
  <h1>
    <button on:click={fetchPersonas}> Cargar API</button>
    <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
  </h1>

 {#if personas}
    <ul class="user-list">
      {#each personas.data as persona (persona.id)}
        <li class="user-item">
          <img
            src={persona.avatar}
            alt={persona.first_name}
            class="user-avatar"
          />
          <div class="user-details">
            <p class="user-details__name">
              Nombre: {persona.first_name}
            </p>
            <p class="user-details__email">Email: {persona.email}</p>
          </div>
        </li>
      {/each}
    </ul>
  {/if}
</main>
```

## Resultado Completo del Ejemplo Práctico con Svelte

![](https://raw.githubusercontent.com/urian121/imagenes-proyectos-github/master/loading-request-con-svelte.gif)

👉 [Ver Código en GitHub](https://github.com/urian121/loading-request-con-svelte)

## Ejemplo Práctico en Vue.js

```vue
<script setup>
import { showLoading, hideLoading } from "loading-request";
import "loading-request/dist/index.css";

const handleShowLoading = () => {
  showLoading({
    message: "Cargando App...",
    spinnerColor: "#f3752b",
    textLoadingColor: "#EE5E09",
    textLoadingSize: "20px",
  });

  hideLoading({ timeLoading: 1000 });
};
</script>

<template>
  <div id="app">
    <button @click="handleShowLoading">Mostrar Loading</button>
  </div>
</template>
```

## Uso a través de CDN

También puedes incluir `loading-request` directamente en tu proyecto utilizando un enlace CDN. Sigue estos pasos:

```html
<!-- Incluye el CSS -->
<link rel="stylesheet" href="https://unpkg.com/loading-request/dist/index.css" />

<!-- Incluye el JavaScript -->
<script src="https://unpkg.com/loading-request/dist/index.js"></script>
```

Una vez incluido, podrás utilizar **showLoading** y **hideLoading** en tu código JavaScript o
TypeScript como se muestra en los ejemplos de uso.

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Loading Request</title>
    <!-- Incluir el CSS de loading-request desde CDN -->
    <link rel="stylesheet" href="https://unpkg.com/loading-request/dist/index.css" />
  </head>
  <body>
    <button id="btnLoading">Mostrar Loading</button>

    <!-- Incluir el JavaScript de loading-request desde CDN como módulo -->
    <script type="module">
      import { showLoading, hideLoading } from "https://unpkg.com/loading-request/dist/index.js";

      // Función para mostrar el loading
      function handleShowLoading() {
        showLoading({
          message: "Cargando App...",
          spinnerColor: "#f3752b",
          textLoadingColor: "#EE5E09",
          textLoadingSize: "16px",
        });

        hideLoading();
      }

      // Asociar la función al botón
      document.querySelector("#btnLoading").addEventListener("click", handleShowLoading);
    </script>
  </body>
</html>
```

## API

#### showLoading(opciones?: ShowLoadingOptions)

Es una función que permite mostrar un indicador de carga con opciones personalizables.

- **Opciones**:
  - **message:** Mensaje que se muestra junto al indicador de carga. Por defecto es "Cargando...".
  - **spinnerColor:** Color opcional del borde del spinner. Si se proporciona, se aplica dinámicamente.
  - **textLoadingColor:** Color opcional del texto del mensaje de carga. Si se proporciona, se aplica dinámicamente.
  - **textLoadingSize:** Tamaño opcional del texto del mensaje de carga. Se aplica dinámicamente si se proporciona por default "16px".

Recibe un objeto de configuración opcional. Si no se proporciona ningún argumento, se utilizará un objeto vacío como valor por defecto.

**Ejemplo de uso**:

```jsx
showLoading({
  message: "Cargando...",
  spinnerColor: "#f3752b",
  textLoadingColor: "#EE5E09",
  textLoadingSize: "18px",
});
```

#### hideLoading(opciones?: HideLoadingOptions)

Es una función que permite ocultar el indicador de carga después de un período de tiempo especificado.

- **Parámetros**:
  - opciones: Un objeto opcional que puede contener:
    - timeLoading: Tiempo en milisegundos antes de ocultar el indicador. Por defecto es 500ms.

Si se llama sin argumentos, se utilizará un objeto vacío como valor por defecto.

**Ejemplo de uso**:

```jsx
hideLoading({ timeLoading: 1500 });
```

### Únete y Contribuye

Si encuentras algún problema o tienes una idea para mejorar el paquete, por favor abre un issue o envía un pull request en GitHub: https://github.com/urian121/loading-request

## Desarrollado por

- [Urian Viera](https://github.com/urian123)
- [Mi portafolio](https://www.urianviera.com)
- [Canal de Youtube](https://www.youtube.com/WebDeveloperUrianViera)
- [¡Donar a través de PayPal!](https://www.paypal.com/donate/?hosted_button_id=4SV78MQJJH3VE)
- [Email](mailto:urian1213viera@gmail.com)

## Copyright

© 2024 Urian Viera. Todos los derechos reservados.

## License

Licensed under ISC

[![GitHub](https://img.shields.io/badge/GitHub-urian121/loading--request-181717?logo=github&style=flat-square)](https://github.com/urian121/loading-request)

## Agradecimientos

¡Gracias a todos los **Devs** 👨‍💻 que han utilizado y contribuido al desarrollo de **Loading Request**! Su apoyo y retroalimentación son fundamentales para mejorar continuamente este paquete.
