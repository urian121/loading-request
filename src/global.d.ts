// Declaración para los estilos CSS
declare module "*.css" {
  const content: string;
  export default content;
}

// Declaraciones para la librería loading-request
declare module 'loading-request' {
  // Interface principal
  export interface LoadingConfig {
    message?: string;
    spinnerColor?: string;
    textColor?: string;
    textSize?: string;
    backgroundColor?: string;
    opacity?: number;
    minDuration?: number;
  }

  // API principal moderna (3 funciones globales)
  export function showLoading(config?: LoadingConfig): void;
  export function hideLoading(): Promise<void>;
  export function updateLoading(config: Partial<LoadingConfig>): void;
}

// Declaración global para uso directo en browser
declare global {
  interface Window {
    loadingRequest: {
      show: (config?: import('loading-request').LoadingConfig) => void;
      hide: () => Promise<void>;
      update: (config: Partial<import('loading-request').LoadingConfig>) => void;
    };
  }
}