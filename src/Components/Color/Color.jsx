import "./Color.css";

export default function Color({ color }) {
  return (
    <li id={color.id} className="color-card" style={{ background: color.hex }}>
      <h2 className="color-card-headline">{color.hex}</h2>
      <p className="color-card-role" style={{ color: color.contrastText }}>
        {color.role}
      </p>
      <p className="color-card-contrast" style={{ color: color.contrastText }}>
        {color.contrastText}
      </p>
    </li>
  );
}
