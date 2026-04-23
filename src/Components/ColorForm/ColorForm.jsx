import ColorInput from "../ColorInput/ColorInput";
import { uid } from "uid";
import "./ColorForm.css";

export default function ColorForm({
  //when changed to onAddColor Add color function does not work
  onSubmitColor,
  initialData = { role: "your color", hex: "#123456", contrastText: "#ffffff" },
}) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const newColorWithId = {
      ...data,
      id: uid(),
    };
    onSubmitColor(newColorWithId);
    event.target.reset();
  }

  return (
    <form className="color-form" onSubmit={handleSubmit}>
      <div className="color-role-input">
        <label htmlFor="role">Role</label>

        <input
          type="text"
          id="role"
          name="role"
          defaultValue={initialData.role}
        />
      </div>
      <div className="color-hex-input">
        <label htmlFor="hex">Hex </label>

        <ColorInput id="hex" defaultValue={initialData.hex} />
      </div>

      <div className="color-contrastText-input">
        <label htmlFor="contrastText">Contrast Text </label>

        <ColorInput id="contrastText" defaultValue={initialData.contrastText} />
      </div>
      <button
        type="submit"
        aria-label="Add new color card"
        style={{ marginTop: "1rem" }}
      >
        Add Color
      </button>
    </form>
  );
}
