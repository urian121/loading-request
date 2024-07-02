// Creando la interfaz para las opciones
export interface ShowLoadingOptions {
  message?: string;
  spinnerColor?: string;
  textLoadingColor?: string;
}

// Creando la interfaz para las opciones de ocultar el loading, interfaz que define el parámetro opcional timeLoading para la función hideLoading
export interface HideLoadingOptions {
  timeLoading?: number;
}
