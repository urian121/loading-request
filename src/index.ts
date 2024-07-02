import "./loading.css"; // Importando el archivo CSS
import { ShowLoadingOptions, HideLoadingOptions } from "../types/index";

/**
 * Muestra un indicador de carga con opciones personalizables.
 * En caso de que no se pase ningún objeto al llamar a la función showLoading, se utilizará un objeto vacío como valor por defecto.
 * @param message Mensaje opcional que se muestra junto al indicador de carga. Por defecto es "Cargando...".
 * @param spinnerColor Color opcional del borde del spinner. Si se proporciona, se aplica dinámicamente.
 * @param textLoadingColor Color opcional del texto del mensaje de carga. Si se proporciona, se aplica dinámicamente.
 */
const showLoading = ({
  message = "Cargando...",
  spinnerColor,
  textLoadingColor,
}: ShowLoadingOptions = {}) => {
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
 * @param timeLoading Tiempo en milisegundos antes de ocultar el indicador. Por defecto es 400ms.
 */
const hideLoading = ({ timeLoading = 500 }: HideLoadingOptions = {}) => {
  const loadingOverlay = document.querySelector(".page-loading.active");
  if (loadingOverlay) {
    setTimeout(() => {
      if (loadingOverlay && loadingOverlay.parentElement) {
        loadingOverlay.parentElement.removeChild(loadingOverlay);
      }
      loadingOverlay.classList.remove("active");
    }, timeLoading);
  }
};

// Eportando las funciones para que puedan ser utilizadas en otros archivos
export { showLoading, hideLoading };
