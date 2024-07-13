// Definición de la interfaz para las opciones de mostrar loading
export interface ShowLoadingOptions {
  message?: string;
  spinnerColor?: string;
  textLoadingColor?: string;
  textLoadingSize?: string;
}

// Definición de la interfaz para las opciones de ocultar el loading
export interface HideLoadingOptions {
  timeLoading?: number;
}
