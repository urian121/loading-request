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

export interface LoadingInstance {
  hide: () => Promise<void>;
  update: (config: Partial<LoadingConfig>) => void;
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

// Variables de estado
let stylesInjected = false;
let currentOverlay: HTMLDivElement | null = null;

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
 * Muestra un indicador de carga moderno y retorna una instancia para controlarlo
 * 
 * @param config - Configuración opcional del loading
 * @returns Instancia del loading con métodos hide() y update()
 * 
 * @example
 * // Uso básico
 * const loading = showLoading();
 * await fetchData();
 * await loading.hide();
 * 
 * @example
 * // Con configuración personalizada
 * const loading = showLoading({
 *   message: 'Procesando...',
 *   spinnerColor: '#ff6b6b',
 *   minDuration: 1000
 * });
 */
export const showLoading = (config: LoadingConfig = {}): LoadingInstance => {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return { hide: async () => {}, update: () => {} };
  }

  injectStyles();
  
  // Remover loading existente si hay uno
  if (currentOverlay) {
    currentOverlay.remove();
    currentOverlay = null;
  }
  
  const finalConfig = { ...defaultConfig, ...config };
  const startTime = Date.now();
  
  // Crear overlay
  const overlay = document.createElement('div');
  overlay.className = 'loading-overlay';
  overlay.style.backgroundColor = finalConfig.backgroundColor!;
  
  // Crear contenido
  const content = document.createElement('div');
  content.className = 'loading-content';
  
  // Crear spinner
  const spinner = document.createElement('div');
  spinner.className = 'loading-spinner';
  spinner.style.borderColor = finalConfig.spinnerColor!;
  spinner.style.borderTopColor = 'transparent';
  
  // Crear texto
  const text = document.createElement('span');
  text.className = 'loading-text';
  text.textContent = finalConfig.message!;
  text.style.color = finalConfig.textColor!;
  text.style.fontSize = finalConfig.textSize!;
  
  // Ensamblar elementos
  content.appendChild(spinner);
  content.appendChild(text);
  overlay.appendChild(content);
  document.body.appendChild(overlay);
  
  // Activar con animación
  requestAnimationFrame(() => {
    overlay.style.opacity = String(finalConfig.opacity);
    overlay.classList.add('active');
  });
  
  currentOverlay = overlay;
  
  // Función para ocultar con tiempo mínimo garantizado
  const hide = async (): Promise<void> => {
    if (!overlay.parentElement) return;
    
    const elapsed = Date.now() - startTime;
    const minDuration = finalConfig.minDuration || 0;
    const remaining = Math.max(0, minDuration - elapsed);
    
    if (remaining > 0) {
      await new Promise(resolve => setTimeout(resolve, remaining));
    }
    
    overlay.classList.remove('active');
    overlay.style.opacity = '0';
    
    setTimeout(() => {
      if (overlay.parentElement) {
        overlay.remove();
      }
      if (currentOverlay === overlay) {
        currentOverlay = null;
      }
    }, 300);
  };
  
  // Función para actualizar configuración en tiempo real
  const update = (newConfig: Partial<LoadingConfig>): void => {
    if (newConfig.message !== undefined) {
      text.textContent = newConfig.message;
    }
    if (newConfig.spinnerColor !== undefined) {
      spinner.style.borderColor = newConfig.spinnerColor;
      spinner.style.borderTopColor = 'transparent';
    }
    if (newConfig.textColor !== undefined) {
      text.style.color = newConfig.textColor;
    }
    if (newConfig.textSize !== undefined) {
      text.style.fontSize = newConfig.textSize;
    }
    if (newConfig.backgroundColor !== undefined) {
      overlay.style.backgroundColor = newConfig.backgroundColor;
    }
    if (newConfig.opacity !== undefined) {
      overlay.style.opacity = String(newConfig.opacity);
    }
  };
  
  return { hide, update };
};

/**
 * Oculta cualquier loading activo inmediatamente
 */
export const hideLoading = (): void => {
  if (currentOverlay) {
    currentOverlay.classList.remove('active');
    currentOverlay.style.opacity = '0';
    
    setTimeout(() => {
      if (currentOverlay) {
        currentOverlay.remove();
        currentOverlay = null;
      }
    }, 300);
  }
};

/**
 * Loading temporal que se oculta automáticamente
 * 
 * @param config - Configuración del loading
 * @param duration - Duración en milisegundos
 * @returns Instancia del loading
 * 
 * @example
 * showLoadingTemp({ message: '¡Guardado!' }, 2000);
 */
export const showLoadingTemp = (
  config: LoadingConfig = {}, 
  duration: number = 2000
): LoadingInstance => {
  const instance = showLoading({ ...config, minDuration: 0 });
  
  setTimeout(async () => {
    await instance.hide();
  }, duration);
  
  return instance;
};

// Compatibilidad con versión anterior (deprecated)
export interface ShowLoadingOptions {
  message?: string;
  spinnerColor?: string;
  textLoadingColor?: string;
  textLoadingSize?: string;
}

export interface HideLoadingOptions {
  timeLoading?: number;
}

/**
 * @deprecated Usa showLoading() en su lugar
 */
const showLoadingLegacy = (options: ShowLoadingOptions = {}) => {
  const config: LoadingConfig = {
    message: options.message,
    spinnerColor: options.spinnerColor,
    textColor: options.textLoadingColor,
    textSize: options.textLoadingSize,
  };
  
  showLoading(config);
};

/**
 * @deprecated Usa hideLoading() o loading.hide() en su lugar
 */
const hideLoadingLegacy = (options: HideLoadingOptions = {}) => {
  const { timeLoading = 500 } = options;
  setTimeout(() => {
    hideLoading();
  }, timeLoading);
};

// Exportar funciones legacy para compatibilidad
export { showLoadingLegacy as showLoading_v1, hideLoadingLegacy as hideLoading_v1 };

// Exposición global para uso directo en browser
if (typeof window !== 'undefined') {
  (window as any).loadingRequest = {
    show: showLoading,
    hide: hideLoading,
    showTemp: showLoadingTemp,
    // Legacy
    showLoading: showLoadingLegacy,
    hideLoading: hideLoadingLegacy,
  };
}