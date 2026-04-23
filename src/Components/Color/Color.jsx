import "./Color.css";
import { useState } from "react";
import ColorForm from "../ColorForm/ColorForm";
import CopyToClipboard from "../CopyToClipboard/CopyToClipboard";

export default function Color({ color, onDeleteColor, onEditColor }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditSubmit(updatedColor) {
    onEditColor({ ...updatedColor, id: color.id });
    setIsEditing(false); // Close form after save
  }

  return (
    <li id={color.id} className="color-card" style={{ background: color.hex }}>
      {showConfirm ? (
        // Confirmation View (using toggle method)
        <div className="color-card-confirm">
          <p className="color-card-highlight">Delete?</p>
          <button type="button" onClick={() => onDeleteColor(color.id)}>
            Confirm
          </button>
          <button type="button" onClick={() => setShowConfirm(false)}>
            Cancel
          </button>
        </div>
      ) : isEditing ? ( // Task: Display ColorForm when in edit mode
        <>
          <ColorForm
            onAddColor={handleEditSubmit}
            initialData={color}
            isUpdateMode={true}
          />
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </>
      ) : (
        //standard view

        <>
          <h2 className="color-card-headline">{color.hex}</h2>
          <CopyToClipboard hexCode={color.hex} />
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
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        </>
      )}
    </li>
  );
}
