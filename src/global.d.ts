// declaración para los estilos
declare module "*.css" {
  const content: string;
  export default content;
}

// declaración para tu librería
declare module 'loading-request' {
  export interface ShowLoadingOptions {
    message?: string;
    spinnerColor?: string;
    textLoadingColor?: string;
    textLoadingSize?: string;
  }

  export interface HideLoadingOptions {
    timeLoading?: number;
  }

  export function showLoading(options?: ShowLoadingOptions): void;
  export function hideLoading(options?: HideLoadingOptions): void;
}