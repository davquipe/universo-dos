
type Credit = { label: string; name: string };

type Props = {
  /** URL del logo (PNG/SVG). Si no lo pasas, se muestra un placeholder circular. */
  logoUrl?: string;
  logoAlt?: string;
  /** Créditos a mostrar (máx 3–4 líneas) */
  credits?: Credit[];
};

const defaultCredits: Credit[] = [
  { label: "Investigación",  name: "Raúl Castillo" },
  { label: "Diseño",        name: "Christian Marlow" },
  { label: "Programación",  name: "David Condori" },
];

const FooterCredits = ({
  logoUrl,
  logoAlt = "Logo del proyecto",
  credits = defaultCredits,
}: Props) => {
  return (
    <footer className="fc" aria-labelledby="footer-credits-title">
      <h2 id="footer-credits-title" className="fc__sr">Créditos</h2>

      <div className="fc__logo" aria-hidden={!!logoUrl ? "false" : "true"}>
        {logoUrl ? (
          <img src={logoUrl} alt={logoAlt} />
        ) : (
          <span className="fc__logoMark">C</span>
        )}
      </div>

      <ul className="fc__list">
        {credits.map((c, i) => (
          <li key={i} className="fc__item">
            <span className="fc__label">{c.label}:</span>{" "}
            <strong className="fc__name">{c.name}</strong>
          </li>
        ))}
      </ul>
    </footer>
  );
}

export default FooterCredits