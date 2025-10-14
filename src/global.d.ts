// Declaración para los estilos CSS
declare module "*.css" {
  const content: string;
  export default content;
}

// Declaraciones para la librería loading-request
declare module 'loading-request' {
  // Interfaces principales
  export interface LoadingConfig {
    message?: string;
    spinnerColor?: string;
    backgroundColor?: string;
    opacity?: number;
    minDuration?: number;
  }

  export interface LoadingInstance {
    hide(): Promise<void>;
    update(config: LoadingConfig): void;
  }

  // API principal moderna
  export function showLoading(config?: LoadingConfig): LoadingInstance;
  export function hideLoading(): void;
  export function showLoadingTemp(config?: LoadingConfig, duration?: number): LoadingInstance;

  // Interfaces legacy (deprecated)
  export interface ShowLoadingOptions {
    message?: string;
    spinnerColor?: string;
    textLoadingColor?: string;
    textLoadingSize?: string;
  }

  export interface HideLoadingOptions {
    timeLoading?: number;
  }

  // Funciones legacy (deprecated)
  export function showLoadingLegacy(message?: string, spinnerColor?: string): void;
  export function hideLoadingLegacy(): void;
}

// Declaración global para uso directo en browser
declare global {
  interface Window {
    loadingRequest: {
      show: (config?: import('loading-request').LoadingConfig) => import('loading-request').LoadingInstance;
      hide: () => void;
      showTemp: (config?: import('loading-request').LoadingConfig, duration?: number) => import('loading-request').LoadingInstance;
      // Legacy
      showLoading: (message?: string, spinnerColor?: string) => void;
      hideLoading: () => void;
    };
  }
}