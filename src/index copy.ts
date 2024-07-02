import "./loading.css";

const showLoading = (message: string = "Cargando...") => {
  const loadingOverlay = document.createElement("div");
  loadingOverlay.className = "page-loading active";
  loadingOverlay.innerHTML = `
    <div class="page-loading-inner">
      <div class="page-spinner"></div>
      <span>${message}</span>
    </div>
  `;
  document.body.appendChild(loadingOverlay);
};

const hideLoading = (timeLoading: number = 500) => {
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
