import React from "react";

type Props = {
  /** Imagen de fondo para desktop */
  bgUrl: string;
  /** Imagen de fondo para mobile (fallback: usa bgUrl si no se pasa) */
  mobileBgUrl?: string;
  onClickGeneral?: () => void;
  onClickMatches?: () => void;
};

const UniverseHeader = ({
  bgUrl,
  mobileBgUrl,
  onClickGeneral,
  onClickMatches,
}: Props) => {
  const heroStyle = {
    "--bg-desktop": `url(${bgUrl})`,
    "--bg-mobile": `url(${mobileBgUrl || bgUrl})`,
  } as React.CSSProperties;

  return (
    <header className="uheader">
      {/* Banner de fondo */}
      <div className="uheader__hero" style={heroStyle} />

      {/* Texto descriptivo */}
      <p className="uheader__lead">
        Revisa los datos y el historial de todos los jugadores convocados rumbo
        al Mundial 2030 actualizado fecha a fecha.
      </p>

      {/* Botones */}
      <div className="uheader__cta">
        <button
          className="btn btn--primary"
          type="button"
          onClick={onClickGeneral}
        >
          INFORMACIÓN GENERAL
        </button>
        <button
          className="btn btn--neutral"
          type="button"
          onClick={onClickMatches}
        >
          VER TODOS LOS PARTIDOS
        </button>
      </div>
    </header>
  );
};

export default UniverseHeader;
