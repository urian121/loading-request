# Loading Request

[![npm version](https://img.shields.io/npm/v/loading-request.svg?style=flat-square)](https://www.npmjs.com/package/loading-request)
[![GitHub Repo](https://img.shields.io/badge/repository-GitHub-blue?style=flat-square&logo=github)](https://github.com/urian121/loading-request)
[![npm](https://img.shields.io/npm/dt/loading-request.svg)](https://www.npmjs.com/package/loading-request)
[![License](https://img.shields.io/badge/license-ISC-blue.svg?style=flat-square)](https://opensource.org/licenses/ISC)

**Loading Request** es un paquete npm moderno, intuitivo, liviano y flexible, diseñado para mejorar la experiencia del usuario mostrando indicadores de carga durante solicitudes y procesos asincrónicos en aplicaciones web. Compatible con frameworks populares como React, Vue, Svelte, Next.js, y Astro, este paquete simplifica la implementación de spinners, barras de progreso y otros indicadores visuales.

![demo](https://raw.githubusercontent.com/urian121/imagenes-proyectos-github/master/Loading-Request-formulario.gif)

## ¿Por qué Loading Request?

**Loading Request** facilita la incorporación de indicadores de carga en aplicaciones JavaScript, proporcionando una solución rápida y eficiente para mostrar que una solicitud o proceso está en curso. Este paquete responde a la necesidad de mejorar la usabilidad y percepción del rendimiento en aplicaciones web al proporcionar una visualización clara y atractiva del estado de carga, evitando la incertidumbre del usuario durante procesos asincrónicos.

## Instalación

```bash
npm install loading-request --save
yarn add loading-request
```

## Uso Básico

### **1. Formulario con Confirmación**
Ejemplo completo que muestra loading durante el envío, actualiza el mensaje dinámicamente y mantiene feedback visual antes de ocultar.
Ideal para formularios de contacto, registro o cualquier proceso que requiera confirmación visual al usuario.

```javascript
import { showLoading, hideLoading, updateLoading } from 'loading-request';

const handleSubmit = async (e) => {
  e.preventDefault();
  
  showLoading({
    message: 'Enviando mensaje...',
    spinnerColor: '#10b981',
    minDuration: 1000
  });

  try {
    const formData = new FormData(e.target);
    await fetch('/api/contact', { method: 'POST', body: formData });
    
    // Actualizar mensaje de confirmación
    updateLoading({ 
      message: '¡Mensaje enviado!',
      spinnerColor: '#10b981'
    });
    
    // Esperar un poco antes de ocultar
    setTimeout(async () => {
      await hideLoading();
    }, 2000);
  } catch (error) {
    await hideLoading();
  }
};

document.querySelector('#contactForm').addEventListener('submit', handleSubmit);
```

### **2. Actualización Dinámica**
A continuación, se muestra cómo actualizar el mensaje y el color del spinner en función del progreso de un proceso. Ideal para procesos que requieren feedback visual en tiempo real.

```javascript
import { showLoading, updateLoading, hideLoading } from 'loading-request';

const handleProcess = async () => {
  showLoading({ message: 'Iniciando...' });
  
  // Actualizar mensaje dinámicamente
  setTimeout(() => {
    updateLoading({ 
      message: 'Procesando datos...', 
      spinnerColor: '#ffa500' 
    });
  }, 1000);
  
  setTimeout(() => {
    updateLoading({ 
      message: 'Finalizando...', 
      spinnerColor: '#28a745' 
    });
  }, 2000);
  
  setTimeout(async () => {
    await hideLoading();
  }, 3000);
};

document.querySelector('#processBtn').addEventListener('click', handleProcess);
```

### **3. Loading Automático en Peticiones HTTP**
Para este ejemplo, se muestra cómo mostrar loading automáticamente cuando se realiza una solicitud HTTP y ocultarlo cuando la respuesta se recibe. Ideal para procesos que requieren feedback visual en tiempo real.

```javascript
import { showLoading, hideLoading } from 'loading-request';

// Función para obtener datos del servidor
async function obtenerDatos() {
  showLoading({ message: 'Cargando usuarios...' });
  try {
    const response = await fetch('/api/usuarios');
    const datos = await response.json();
    console.log(datos);
    return datos;
  } finally {
    await hideLoading();
  }
}

// Función para guardar datos
async function guardarUsuario(usuario) {
  showLoading({ 
    message: 'Guardando usuario...', 
    spinnerColor: '#10b981' 
  });
  try {
    await fetch('/api/usuarios', {
      method: 'POST',
      body: JSON.stringify(usuario)
    });
    alert('Usuario guardado exitosamente');
  } finally {
    await hideLoading();
  }
}

// Uso
obtenerDatos();
guardarUsuario({ nombre: 'Juan', email: 'juan@email.com' });
```

## Implementar Loading Request en el envío de un formulario

![demo](https://raw.githubusercontent.com/urian121/imagenes-proyectos-github/master/Loading-Request-formulario.gif)
👉 [Ver Código en GitHub](https://github.com/urian121/implementar-loading-request-durante-el-envio-de-formularios-con-reactjs)

### Implementación de Filtrado Dinámico en Next.js con Loading Request

![demo](https://raw.githubusercontent.com/urian121/imagenes-proyectos-github/master/filtrado-dinamico-con-checkbox-en-Nextjs-y-usando-el-paquete-loading-request.gif)
👉 [Ver Código en GitHub](https://github.com/urian121/filtrado-dinamico-con-checkbox-en-nextjs-y-loading-request)

### Implementación de Filtros Checkbox en ReactJS utilizando el paquete Loading Request

![demo](https://raw.githubusercontent.com/urian121/imagenes-proyectos-github/master/checkbox-filters-with-reactjs-loading-request.gif)
👉 [Ver Código en GitHub](https://github.com/urian121/checkbox-filters-with-reactjs)

## 📖 Referencia Completa

### **showLoading(config?: LoadingConfig): void**

Muestra un loading con configuración personalizada.

```js
showLoading({
  message: 'Procesando...',
  spinnerColor: '#3b82f6',
  minDuration: 1000
});

// Actualizar mensaje
updateLoading({ message: 'Casi listo...' });

// Ocultar (respeta minDuration automáticamente)
await hideLoading();
```

## Ejemplo Práctico utilizando Next.js

```jsx
'use client';
import { useState } from 'react';
import { showLoading, updateLoading, hideLoading } from 'loading-request';

export default function ProductPage() {
  const [products, setProducts] = useState([]);

  // Cargar productos con loading
  const fetchProducts = async () => {
    showLoading({
      message: 'Cargando productos...',
      spinnerColor: '#3b82f6'
    });
    
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      await hideLoading();
    }
  };

  // Eliminar producto con loading dinámico
  const deleteProduct = async (id) => {
    showLoading({
      message: 'Eliminando producto...',
      spinnerColor: '#ef4444',
      minDuration: 800
    });

    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      
      // Actualizar mensaje de éxito
      updateLoading({ 
        message: '¡Eliminado!', 
        spinnerColor: '#10b981' 
      });
      
      // Esperar un poco antes de ocultar
      setTimeout(async () => {
        await hideLoading();
        fetchProducts(); // Recargar lista
      }, 1000);
      
    } catch (error) {
      await hideLoading();
      
      // Mostrar error temporalmente
      showLoading({
        message: 'Error al eliminar',
        spinnerColor: '#ef4444',
        minDuration: 0
      });
      
      setTimeout(async () => {
        await hideLoading();
      }, 2000);
    }
  };

  return (
    <div>
      <button onClick={fetchProducts}>
        Cargar Productos
      </button>
      
      {products.map(product => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <button onClick={() => deleteProduct(product.id)}>
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
}
```

## API Clásica

```jsx
"use client";
import { useState } from "react";
import { getSimpson } from "../actions/getSimpson";
import Image from "next/image";
import { showLoading, hideLoading } from "loading-request";

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
      await hideLoading();
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
              <Image
                width={200}
                height={200}
                src={personaje.image}
                alt={personaje.character}
              />
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

```js
<script>
  import svelteLogo from "./assets/svelte.svg";
  import { showLoading, hideLoading } from "loading-request";

  let personas = null;
  
  async function fetchPersonas() {
    showLoading({
      message: "Cargando Solicitud...",
      spinnerColor: "#f3752b",
      textColor: "#EE5E09",
      textSize: "18px",
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
      await hideLoading();
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

```js
<script setup>
import { showLoading, hideLoading } from "loading-request";

const handleShowLoading = async () => {
  showLoading({
    message: "Cargando App...",
    spinnerColor: "#f3752b",
    textColor: "#EE5E09",
    textSize: "20px",
  });

  // Simular proceso async
  setTimeout(async () => {
    await hideLoading();
  }, 2000);
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
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Loading Request</title>
  </head>
  <body>
    <button id="btnLoading">Mostrar Loading</button>

    <!-- Incluir el JavaScript de loading-request desde CDN -->
    <script src="https://unpkg.com/loading-request@2.15.0/dist/loading-request.min.js"></script>
    <script>
      // Función para mostrar el loading
      async function handleShowLoading() {
        showLoading({
          message: "Cargando App...",
          spinnerColor: "#f3752b",
          textColor: "#EE5E09",
          textSize: "16px",
        });

        // Simular proceso
        setTimeout(async () => {
          await hideLoading();
        }, 2000);
      }

      // Asociar la función al botón
      document
        .querySelector("#btnLoading")
        .addEventListener("click", handleShowLoading);
    </script>
  </body>
</html>
```

### Notas importantes sobre el uso con CDN:
La librería expone las funciones `showLoading()`, `hideLoading()` y `updateLoading()` que deben ser importadas o usadas directamente.

## 📚 API Completa

### **showLoading(config?): void**

Muestra un loading con configuración personalizada.

**Parámetros de configuración**:
- **message**: Mensaje a mostrar (default: 'Cargando...')
- **spinnerColor**: Color del spinner (default: '#7366ff')
- **textColor**: Color del texto (default: '#7366ff')
- **textSize**: Tamaño del texto (default: '16px')
- **backgroundColor**: Color de fondo (default: '#fff')
- **opacity**: Opacidad del overlay (default: 0.90)
- **minDuration**: Tiempo mínimo visible en ms (default: 500)

```js
showLoading({
  message: 'Procesando...',
  spinnerColor: '#3b82f6',
  minDuration: 1000
});
```

### **hideLoading(): Promise<void>**

Oculta el loading activo respetando automáticamente el `minDuration` configurado.

```js
await hideLoading(); // Respeta minDuration automáticamente
```

### **updateLoading(config): void**

Actualiza la configuración del loading activo en tiempo real.

```js
updateLoading({ 
  message: 'Finalizando...', 
  spinnerColor: '#28a745' 
});
```

## 🔧 Ejemplo Completo

```js
import { showLoading, updateLoading, hideLoading } from 'loading-request';

class ProductPage {
  constructor() {
    this.products = [];
  }

  // Cargar productos con loading
  async loadProducts() {
    showLoading({ 
      message: 'Cargando productos...',
      spinnerColor: '#3b82f6'
    });
    
    try {
      const response = await fetch('/api/products');
      this.products = await response.json();
      this.renderProducts();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      await hideLoading();
    }
  }

  // Guardar producto con actualizaciones dinámicas
  async saveProduct(product) {
    showLoading({ 
      message: 'Guardando producto...',
      minDuration: 800
    });
    
    try {
      await fetch('/api/products', {
        method: 'POST',
        body: JSON.stringify(product)
      });
      
      // Actualizar mensaje de éxito
      updateLoading({ 
        message: '¡Producto guardado!',
        spinnerColor: '#10b981'
      });
      
      // Esperar antes de ocultar
      setTimeout(async () => {
        await hideLoading();
      }, 1500);
      
    } catch (error) {
      console.error('Error:', error);
      await hideLoading();
    }
  }

  renderProducts() {
    // Renderizar productos...
  }
}
```

### Únete y Contribuye

Si encuentras algún problema o tienes una idea para mejorar el paquete, por favor abre un issue o envía un pull request en GitHub: https://github.com/urian121/loading-request

## 👨‍💻 Desarrollador

**Urian Viera**  
🌐 [urianviera.com](https://www.urianviera.com)  
📺 [YouTube](https://www.youtube.com/WebDeveloperUrianViera)  
💌 [urian1213viera@gmail.com](mailto:urian1213viera@gmail.com)  
☕ [¡Apóyame en PayPal!](https://www.paypal.com/donate/?hosted_button_id=4SV78MQJJH3VE)

## Copyright

© 2024 Urian Viera. Todos los derechos reservados.

## License

Licensed under ISC

[![GitHub](https://img.shields.io/badge/GitHub-urian121/loading--request-181717?logo=github&style=flat-square)](https://github.com/urian121/loading-request)

## Agradecimientos

¡Gracias a todos los **Devs** 👨‍💻 que han utilizado y contribuido al desarrollo de **Loading Request**! Su apoyo y retroalimentación son fundamentales para mejorar continuamente este paquete.
