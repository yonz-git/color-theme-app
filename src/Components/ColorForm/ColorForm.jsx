import ColorInput from "../ColorInput/ColorInput";
import { uid } from "uid";

export default function ColorForm({
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
      <label htmlFor="role">
        Role
        <br />
        <input
          type="text"
          id="role"
          name="role"
          defaultValue={initialData.role}
        />
      </label>
      <br />
      <label htmlFor="hex">
        Hex
        <br />
        <ColorInput id="hex" defaultValue={initialData.hex} />
      </label>
      <br />
      <label htmlFor="contrastText">
        Contrast Text
        <br />
        <ColorInput id="contrastText" defaultValue={initialData.contrastText} />
      </label>
      <br />
      <button style={{ marginTop: "1rem" }}> Add Color </button>
    </form>
  );
}
