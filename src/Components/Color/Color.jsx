import "./Color.css";
import { useState } from "react";
import ColorForm from "../ColorForm/ColorForm";

export default function Color({ color, onDeleteColor, onEditColor }) {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <li id={color.id} className="color-card" style={{ background: color.hex }}>
      {showConfirm ? (
        // Confirmation View
        <div className="color-card-confirm">
          <p className="color-card-highlight">Really delete?</p>
          <button type="button" onClick={() => onDeleteColor(color.id)}>
            Confirm
          </button>
          <button type="button" onClick={() => setShowConfirm(false)}>
            Cancel
          </button>
        </div>
      ) : (
        //standard view

        <>
          <h2 className="color-card-headline">{color.hex}</h2>
          <p className="color-card-role" style={{ color: color.contrastText }}>
            {color.role}
          </p>
          <p
            className="color-card-contrast"
            style={{ color: color.contrastText }}
          >
            {color.contrastText}
          </p>
          <button
            type="button"
            aria-label={`Delete color: ${color.role}`}
            style={{ marginTop: "1rem" }}
            onClick={() => setShowConfirm(true)}
          >
            Delete
          </button>
          <button
            type="button"
            aria-label={`Edit color: ${color.role}`}
            style={{ marginTop: "1rem" }}
          >
            Edit
          </button>
        </>
      )}
    </li>
  );
}
