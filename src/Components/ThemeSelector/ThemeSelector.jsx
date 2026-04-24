import { useState, useEffect } from "react";

export default function ThemeSelector({
  themes,
  activeThemeId,
  onSelect,
  onAdd,
  onDelete,
  onUpdate,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState("");

  const activeTheme = themes.find((t) => t.id === activeThemeId);
  const isDefault = activeThemeId === "t1";

  function handleEditClick() {
    setIsEditing(true);
    setEditValue(activeTheme.name);
  }

  function handleSave() {
    onUpdate(activeThemeId, editValue);
    setIsEditing(false);
  }
  if (isEditing) {
    return (
      <section className="theme-selector">
        <label htmlFor="themeName">Theme Name:</label>
        <input
          id="themeName"
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          autoFocus
        />
        <button onClick={handleSave}>UPDATE</button>
        <button onClick={() => setIsEditing(false)}>CANCEL</button>
      </section>
    );
  }

  return (
    <section className="theme-selector">
      <select value={activeThemeId} onChange={(e) => onSelect(e.target.value)}>
        {themes.map((theme) => (
          <option key={theme.id} value={theme.id}>
            {theme.name}
          </option>
        ))}
      </select>
      <button onClick={onAdd}>ADD</button>
      <button disabled={isDefault} onClick={handleEditClick}>
        EDIT
      </button>
      <button disabled={isDefault} onClick={onDelete}>
        DELETE
      </button>
    </section>
  );
}
