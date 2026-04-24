import { useState, useEffect } from "react";
import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm/ColorForm";
import ThemeSelector from "./Components/ThemeSelector/ThemeSelector";
import { uid } from "uid";
import "./App.css";
import { initialThemes } from "./data";

function App() {
  const [colors, setColors] = useState(() => {
    const savedColors = localStorage.getItem("colors");
    return savedColors ? JSON.parse(savedColors) : initialColors;
  });
  const [themes, setThemes] = useState(() => {
    const savedThemes = localStorage.getItem("themes");
    return savedThemes ? JSON.parse(savedThemes) : initialThemes;
  });
  const [activeThemeId, setActiveThemeId] = useState(themes[0].id);

  const activeTheme = themes.find((t) => t.id === activeThemeId) || themes[0];
  const activeColors = colors.filter((c) => activeTheme.colors.includes(c.id));

  const handleAddTheme = () => {
    const newTheme = { id: uid(), name: "New Theme", colors: [] };
    setThemes([...themes, newTheme]);
    setActiveThemeId(newTheme.id);
  };

  const handleDeleteTheme = (id) => {
    if (id === "t1") return;
    setThemes(themes.filter((t) => t.id !== id));
    setActiveThemeId("t1");
  };

  useEffect(() => {
    localStorage.setItem("colors", JSON.stringify(colors));
    localStorage.setItem("themes", JSON.stringify(themes));
  }, [colors, themes]);

  function handleAddColor(newColor) {
    // setColors([newColor, ...colors]);
    setColors((prevColors) => [newColor, ...prevColors]);

    setThemes((prevThemes) =>
      prevThemes.map((theme) => {
        if (theme.id === activeThemeId) {
          return {
            ...theme,
            colors: [newColor.id, ...theme.colors],
          };
        }
        return theme;
      }),
    );
  }

  function handleDeleteColor(idToDelete) {
    setColors(colors.filter((color) => color.id !== idToDelete));
  }
  function handleEditColor(updatedColor) {
    setColors(
      colors.map((color) => {
        // Find the color with the matching ID and replace it with the updated one
        return color.id === updatedColor.id ? updatedColor : color;
      }),
    );
  }

  return (
    <>
      <h1>Theme Creator</h1>
      <ThemeSelector
        themes={themes}
        activeThemeId={activeThemeId}
        onSelect={setActiveThemeId}
        onAdd={handleAddTheme}
        onDelete={() => handleDeleteTheme(activeThemeId)}
      />

      <ColorForm className="color-form" onAddColor={handleAddColor} />
      <div className="colorTheme">
        {activeColors.length === 0 ? (
          <p className="color-card-highlight">
            No colors yet... Start by adding one!
          </p>
        ) : (
          <ul>
            {activeColors.map((color) => (
              <div className="color-form-list" key={color.id}>
                <Color
                  id={color.id}
                  color={color}
                  onDeleteColor={handleDeleteColor}
                  onEditColor={handleEditColor}
                />
              </div>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default App;
