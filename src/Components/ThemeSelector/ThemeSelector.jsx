export default function ThemeSelector({
  themes,
  activeThemeId,
  onSelect,
  onAdd,
  onDelete,
}) {
  const isDefault = activeThemeId === "t1";

  return (
    <section>
      <select value={activeThemeId} onChange={(e) => onSelect(e.target.value)}>
        {themes.map((t) => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </select>
      <button onClick={onAdd}>ADD</button>
      <button disabled={isDefault}>EDIT</button>
      <button disabled={isDefault} onClick={onDelete}>
        DELETE
      </button>
    </section>
  );
}
