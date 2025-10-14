import css from "./loading.css";

// Interfaces optimizadas
export interface LoadingConfig {
  message?: string;
  spinnerColor?: string;
  textColor?: string;
  textSize?: string;
  backgroundColor?: string;
  opacity?: number;
  minDuration?: number;
}

// Configuración por defecto
const defaultConfig: LoadingConfig = {
  message: 'Cargando...',
  spinnerColor: '#7366ff',
  textColor: '#7366ff',
  textSize: '16px',
  backgroundColor: '#fff',
  opacity: 0.90,
  minDuration: 500,
};

// Variables de estado globales
let stylesInjected = false;
let currentOverlay: HTMLDivElement | null = null;
let currentStartTime: number = 0;
let currentConfig: LoadingConfig = { ...defaultConfig };

// Inyección de estilos optimizada
const injectStyles = (): void => {
  if (stylesInjected || typeof document === 'undefined') return;
  
  const existingStyle = document.querySelector('style[data-loading-style]');
  if (existingStyle) {
    stylesInjected = true;
    return;
  }

  const style = document.createElement('style');
  style.setAttribute('data-loading-style', 'true');
  style.textContent = css;
  document.head.appendChild(style);
  stylesInjected = true;
};

/**
 * Muestra un indicador de carga moderno
 * 
 * @param config - Configuración opcional del loading
 * 
 * @example
 * // Uso básico
 * showLoading();
 * await fetchData();
 * hideLoading();
 * 
 * @example
 * // Con configuración personalizada
 * showLoading({
 *   message: 'Procesando...',
 *   spinnerColor: '#ff6b6b',
 *   minDuration: 1000
 * });
 */
export const showLoading = (config: LoadingConfig = {}): void => {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  injectStyles();
  
  // Remover loading existente si hay uno
  if (currentOverlay) {
    currentOverlay.remove();
    currentOverlay = null;
  }
  
  currentConfig = { ...defaultConfig, ...config };
  currentStartTime = Date.now();
  
  // Crear overlay
  const overlay = document.createElement('div');
  overlay.className = 'loading-overlay';
  overlay.style.backgroundColor = currentConfig.backgroundColor!;
  
  // Crear contenido
  const content = document.createElement('div');
  content.className = 'loading-content';
  
  // Crear spinner
  const spinner = document.createElement('div');
  spinner.className = 'loading-spinner';
  spinner.style.borderColor = currentConfig.spinnerColor!;
  spinner.style.borderTopColor = 'transparent';
  
  // Crear texto
  const text = document.createElement('span');
  text.className = 'loading-text';
  text.textContent = currentConfig.message!;
  text.style.color = currentConfig.textColor!;
  text.style.fontSize = currentConfig.textSize!;
  
  // Ensamblar elementos
  content.appendChild(spinner);
  content.appendChild(text);
  overlay.appendChild(content);
  document.body.appendChild(overlay);
  
  // Activar con animación
  requestAnimationFrame(() => {
    overlay.style.opacity = String(currentConfig.opacity);
    overlay.classList.add('active');
  });
  
  currentOverlay = overlay;
};

/**
 * Oculta el loading activo respetando el tiempo mínimo configurado
 */
export const hideLoading = async (): Promise<void> => {
  if (!currentOverlay) return;
  
  const elapsed = Date.now() - currentStartTime;
  const minDuration = currentConfig.minDuration || 0;
  const remaining = Math.max(0, minDuration - elapsed);
  
  if (remaining > 0) {
    await new Promise(resolve => setTimeout(resolve, remaining));
  }
  
  currentOverlay.classList.remove('active');
  currentOverlay.style.opacity = '0';
  
  setTimeout(() => {
    if (currentOverlay) {
      currentOverlay.remove();
      currentOverlay = null;
    }
  }, 300);
};

/**
 * Actualiza la configuración del loading activo
 * 
 * @param config - Nueva configuración a aplicar
 * 
 * @example
 * showLoading({ message: 'Cargando...' });
 * updateLoading({ message: 'Casi listo...' });
 * hideLoading();
 */
export const updateLoading = (config: Partial<LoadingConfig>): void => {
  if (!currentOverlay) return;
  
  const spinner = currentOverlay.querySelector('.loading-spinner') as HTMLDivElement;
  const text = currentOverlay.querySelector('.loading-text') as HTMLSpanElement;
  
  if (config.message !== undefined && text) {
    text.textContent = config.message;
  }
  if (config.spinnerColor !== undefined && spinner) {
    spinner.style.borderColor = config.spinnerColor;
    spinner.style.borderTopColor = 'transparent';
  }
  if (config.textColor !== undefined && text) {
    text.style.color = config.textColor;
  }
  if (config.textSize !== undefined && text) {
    text.style.fontSize = config.textSize;
  }
  if (config.backgroundColor !== undefined) {
    currentOverlay.style.backgroundColor = config.backgroundColor;
  }
  if (config.opacity !== undefined) {
    currentOverlay.style.opacity = String(config.opacity);
  }
  
  // Actualizar configuración actual
  currentConfig = { ...currentConfig, ...config };
};

// Exposición global para uso directo en browser
if (typeof window !== 'undefined') {
  (window as any).loadingRequest = {
    show: showLoading,
    hide: hideLoading,
    update: updateLoading,
  };
}