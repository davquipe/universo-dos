export interface Row {
  jugadorImagen: string;
  jugador: string;
  posicionImagen: string;
  partidos: number;
  minutos: number;
  goles: number;
  asistencias: number;
  tarjetasAmarillas: number;
  tarjetasRojas: number;
}

export type PlayerRow = {
  id: string | number;
  name: string;
  avatarUrl?: string;
  pitchImgUrl?: string;
  matches: number;
  minutes: number;
  goals: number;
  assists: number;
  yellow: number;
  red: number;
};