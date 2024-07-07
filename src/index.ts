import "./loading.css"; // Importando el archivo CSS
import { ShowLoadingOptions, HideLoadingOptions } from "../interfaces/index";

/**
 * Muestra un indicador de carga con opciones personalizables.
 *
 * @param options Opciones para personalizar el indicador de carga.
 *                Si no se proporcionan opciones, se utilizarán valores predeterminados.
 *                - `message`: Mensaje opcional que se muestra junto al indicador de carga. Por defecto es "Cargando...".
 *                - `spinnerColor`: Color opcional del borde del spinner. Se aplica dinámicamente si se proporciona.
 *                - `textLoadingColor`: Color opcional del texto del mensaje de carga. Se aplica dinámicamente si se proporciona.
 */
const showLoading = (options: ShowLoadingOptions = {}) => {
  // Haciendo uso de destructuración para extraer las opciones y asignar valores predeterminados si no se proporcionan.
  const { message = "Cargando...", spinnerColor, textLoadingColor } = options;

  const loadingOverlay = document.createElement("div");
  loadingOverlay.className = "page-loading active";

  // Definir el color del spinner dinámicamente o usar el valor por defecto del CSS
  const spinnerStyle = spinnerColor
    ? `style="border: 0.15em solid ${spinnerColor}; border-right-color: transparent;"`
    : "";

  // Definir el color del texto dinámicamente o usar el valor por defecto del CSS
  const textLoadingStyle = textLoadingColor ? `style="color: ${textLoadingColor} !important;"` : "";

  loadingOverlay.innerHTML = `
    <div class="page-loading-inner">
      <div class="page-spinner" ${spinnerStyle}></div>
      <span ${textLoadingStyle}>${message}</span>
    </div>
  `;

  document.body.appendChild(loadingOverlay);
};

/**
 * Oculta el indicador de carga después de un tiempo especificado.
 *
 * @param options Opciones para controlar el tiempo de ocultamiento.
 *                - `timeLoading`: Tiempo en milisegundos antes de ocultar el indicador.
 *                  Por defecto es 500ms.
 */
const hideLoading = ({ timeLoading = 500 }: HideLoadingOptions) => {
  // La función `hideLoading` utiliza desestructuración directamente en los parámetros, de la función para obtener `timeLoading` de `HideLoadingOptions`.
  const loadingOverlay = document.querySelector(".page-loading.active");
  if (loadingOverlay) {
    setTimeout(() => {
      loadingOverlay.parentElement?.removeChild(loadingOverlay);
      loadingOverlay.classList.remove("active");
    }, timeLoading);
  }
};

// Eportando las funciones para que puedan ser utilizadas en otros archivos
export { showLoading, hideLoading };
