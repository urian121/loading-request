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
```javascript
import { showLoading, showLoadingTemp } from 'loading-request';

const handleSubmit = async (e) => {
  e.preventDefault();
  
  const loading = showLoading({
    message: 'Enviando mensaje...',
    spinnerColor: '#10b981',
    minDuration: 1000
  });

  try {
    const formData = new FormData(e.target);
    await fetch('/api/contact', { method: 'POST', body: formData });
    await loading.hide();
    
    // Confirmación temporal
    showLoadingTemp({
      message: '¡Mensaje enviado!',
      spinnerColor: '#10b981'
    }, 3000);
  } catch (error) {
    await loading.hide();
  }
};

document.querySelector('#contactForm').addEventListener('submit', handleSubmit);
```

### **2. Actualización Dinámica**
```javascript
import { showLoading } from 'loading-request';

const handleProcess = async () => {
  const loading = showLoading({ message: 'Iniciando...' });
  
  // Actualizar mensaje dinámicamente
  setTimeout(() => {
    loading.update({ 
      message: 'Procesando datos...', 
      spinnerColor: '#ffa500' 
    });
  }, 1000);
  
  setTimeout(() => {
    loading.update({ 
      message: 'Finalizando...', 
      spinnerColor: '#28a745' 
    });
  }, 2000);
  
  setTimeout(async () => {
    await loading.hide();
  }, 3000);
};

document.querySelector('#processBtn').addEventListener('click', handleProcess);
```

### **3. Loading Automático en Peticiones HTTP**
```javascript
import { showLoading } from 'loading-request';

// Función para obtener datos del servidor
async function obtenerDatos() {
  const loading = showLoading({ message: 'Cargando usuarios...' });
  try {
    const response = await fetch('/api/usuarios');
    const datos = await response.json();
    console.log(datos);
    return datos;
  } finally {
    await loading.hide();
  }
}

// Función para guardar datos
async function guardarUsuario(usuario) {
  const loading = showLoading({ 
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
    await loading.hide();
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

### **showLoading(config?: LoadingConfig): LoadingInstance**

Muestra un loading con configuración personalizada.

```js
const loading = showLoading({
  message: 'Procesando...',
  spinnerColor: '#3b82f6',
  minDuration: 1000
});

// Actualizar mensaje
loading.update({ message: 'Casi listo...' });

// Ocultar
await loading.hide();
```

### **showLoadingTemp(config?: LoadingConfig, duration?: number): LoadingInstance**

Muestra un loading temporal que se oculta automáticamente.

```js
// Se oculta automáticamente después de 2 segundos
showLoadingTemp({ 
  message: '¡Guardado exitosamente!' 
}, 2000);
```

## Ejemplo Práctico utilizando Next.js

```jsx
'use client';
import { useState } from 'react';
import { showLoading, showLoadingTemp } from 'loading-request';

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Cargar productos con loading manual
  const fetchProducts = async () => {
    const loading = showLoading({
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
      await loading.hide();
    }
  };

  // Eliminar producto con loading dinámico
  const deleteProduct = async (id) => {
    const loading = showLoading({
      message: 'Eliminando producto...',
      spinnerColor: '#ef4444',
      minDuration: 800
    });

    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      
      // Actualizar mensaje de éxito
      loading.update({ 
        message: '¡Eliminado!', 
        spinnerColor: '#10b981' 
      });
      
      // Esperar un poco antes de ocultar
      setTimeout(async () => {
        await loading.hide();
        fetchProducts(); // Recargar lista
      }, 1000);
      
    } catch (error) {
      await loading.hide();
      showLoadingTemp({
        message: 'Error al eliminar',
        spinnerColor: '#ef4444'
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

```js
<script setup>
import { showLoading, hideLoading } from "loading-request";

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
    <script src="https://unpkg.com/loading-request@2.15.0/dist/loading-request.umd.js"></script>
    <script>
      // Función para mostrar el loading
      function handleShowLoading() {
        loadingRequest.showLoading({
          message: "Cargando App...",
          spinnerColor: "#f3752b",
          textLoadingColor: "#EE5E09",
          textLoadingSize: "16px",
        });

        loadingRequest.hideLoading({ timeLoading: 1500 });
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
La librería expone un objeto global `loadingRequest` con los métodos `showLoading` y `hideLoading`.

## API

### **showLoading(config?)**

Muestra un loading con control total y retorna una instancia para manipularlo.

**Parámetros de configuración**:
- **message**: Mensaje a mostrar (default: 'Cargando...')
- **spinnerColor**: Color del spinner (default: '#7366ff')
- **textColor**: Color del texto (default: '#7366ff')
- **textSize**: Tamaño del texto (default: '16px')
- **backgroundColor**: Color de fondo (default: '#fff')
- **opacity**: Opacidad del overlay (default: 0.80)
- **minDuration**: Tiempo mínimo visible en ms (default: 500)

**Retorna**: Instancia con métodos `hide()` y `update(config)`

```js
const loading = showLoading({
  message: 'Procesando...',
  spinnerColor: '#3b82f6'
});
await loading.hide();
```

## 🔧 Ejemplo Completo

```js
import { showLoading, showLoadingTemp } from 'loading-request';

class ProductPage {
  constructor() {
    this.products = [];
  }

  // Cargar productos con loading manual
  async loadProducts() {
    const loading = showLoading({ 
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
      await loading.hide();
    }
  }

  // Guardar producto con loading temporal
  async saveProduct(product) {
    const loading = showLoading({ 
      message: 'Guardando producto...',
      minDuration: 800
    });
    
    try {
      await fetch('/api/products', {
        method: 'POST',
        body: JSON.stringify(product)
      });
      
      // Mostrar confirmación temporal
      showLoadingTemp({ 
        message: '¡Producto guardado!' 
      }, 2000);
      
    } catch (error) {
      console.error('Error:', error);
    } finally {
      await loading.hide();
    }
  }

  renderProducts() {
    // Renderizar productos...
  }
}
```

## 📚 API Completa

### **showLoading(config?)**

Muestra un loading con configuración personalizada y retorna una instancia para control total.

**Parámetros:**
- `config` (opcional): Objeto de configuración
  - `message`: Texto a mostrar
  - `spinnerColor`: Color del spinner (hex)
  - `backgroundColor`: Color de fondo del overlay
  - `opacity`: Opacidad del overlay (0-1)
  - `minDuration`: Duración mínima en ms

**Retorna:** `LoadingInstance` con métodos `hide()` y `update(config)`

```js
const loading = showLoading({
  message: 'Procesando...',
  spinnerColor: '#3b82f6',
  minDuration: 1000
});

// Actualizar dinámicamente
loading.update({ message: 'Finalizando...' });

// Ocultar (respeta minDuration)
await loading.hide();
```

### **showLoadingTemp(config?, duration?)**

Muestra un loading temporal que se oculta automáticamente.

**Parámetros:**
- `config` (opcional): Configuración del loading
- `duration` (opcional): Duración en ms (default: 2000)

```js
showLoadingTemp({ 
  message: '¡Guardado exitoso!',
  spinnerColor: '#10b981'
}, 3000);
```

### **hideLoading()**

Oculta cualquier loading activo inmediatamente.

```js
hideLoading(); // Fuerza el cierre
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
