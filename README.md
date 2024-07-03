# Loading Request

[![npm version](https://img.shields.io/npm/v/loading-request.svg?style=flat-square)](https://www.npmjs.com/package/loading-request)
[![GitHub Repo](https://img.shields.io/badge/repository-GitHub-blue?style=flat-square&logo=github)](https://github.com/urian121/loading-request)

Un paquete para mostrar indicadores de carga durante solicitudes o procesos en aplicaciones web. Ideal para mostrar un spinner o indicador de carga al hacer una solicitud a una API REST, enviar un formulario, navegar entre páginas o secciones de un menú, y otros casos similares. Compatible con varios frameworks como React, Vue, Angular, Svelte, Next, JavaScript y más.

## Resultado Final

![demo](https://raw.githubusercontent.com/urian121/imagenes-proyectos-github/master/Loading-Request-formulario.gif)

## Instalación

    $ npm install loading-request --save
    $ yarn add loading-request

## Caracteristicas

- Fácil de usar: Implementa indicadores de carga fácilmente en tu aplicación web con solo unas pocas líneas de código.
- Compatible con múltiples frameworks: Funciona sin problemas con frameworks populares como React, Vue, Angular, y Svelte.
- Personalización flexible: Permite personalizar el color del spinner y del texto del mensaje de carga según las necesidades del usuario.
- Integración rápida: Instalación simple a través de npm o yarn, listo para usar en minutos.
- Funcionalidad asincrónica: Soporta operaciones asíncronas como carga de datos, envío de formularios, y navegación entre páginas.
- Animaciones suaves: Utiliza animaciones CSS para proporcionar una experiencia de usuario fluida.
- Ligero y eficiente: Diseñado para tener un impacto mínimo en el rendimiento de la aplicación.
- Documentación clara y detallada: Incluye ejemplos prácticos y documentación completa para facilitar la implementación y configuración.
- Actualizaciones regulares: Mantenido activamente con mejoras y actualizaciones periódicas.
- Licencia abierta: Publicado bajo licencia ISC, permitiendo su uso en proyectos comerciales y personales sin restricciones.

## Ejemplo Práctico en React.js

```jsx
import { showLoading, hideLoading } from "loading-request";
import "loading-request/dist/index.css";

const App = () => {
  const handleShowLoading = () => {
    showLoading({
      message: "Cargando...",
      spinnerColor: "#f3752b",
      textLoadingColor: "#EE5E09",
    });

    hideLoading({ timeLoading: 1500 });
  };

  return <button onClick={handleShowLoading}>Mostrar Loading</button>;
};

export default App;
```

## Ejemplo Práctico en Next.js

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

## Resultado en Next.js consumiendo una API REST

![](https://raw.githubusercontent.com/urian121/imagenes-proyectos-github/master/loading-request-con-nextjs.gif)

👉 [Código](https://github.com/urian121/loading-request-con-nextjs)

## API

#### showLoading(opciones?: ShowLoadingOptions)

Es una función que permite mostrar un indicador de carga con opciones personalizables.

- **Opciones**:
  - message: Mensaje que se muestra junto al indicador de carga. Por defecto es "Cargando...".
  - spinnerColor: Color opcional del borde del spinner. Si se proporciona, se aplica dinámicamente.
  - textLoadingColor: Color opcional del texto del mensaje de carga. Si se proporciona, se aplica dinámicamente.

Recibe un objeto de configuración opcional. Si no se proporciona ningún argumento, se utilizará un objeto vacío como valor por defecto.

**Ejemplo de uso**:

```jsx
showLoading({
  message: "Cargando...",
  spinnerColor: "#f3752b",
  textLoadingColor: "#EE5E09",
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

### Contribuir

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

Licensed under MIT

[![GitHub](https://img.shields.io/badge/GitHub-urian121/loading--request-181717?logo=github&style=flat-square)](https://github.com/urian121/loading-request)

## Agradecimientos

¡Gracias a todos los Devs 👨‍💻 que han utilizado y contribuido al desarrollo de **Loading Request**! Su apoyo y retroalimentación son fundamentales para mejorar continuamente este paquete.
