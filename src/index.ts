import "./loading.css";

const showLoading = (
  message: string = "Loading...",
  spinnerColor?: string,
  textLoadingColor?: string
) => {
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

const hideLoading = (timeLoading: number = 400) => {
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

export { showLoading, hideLoading };
