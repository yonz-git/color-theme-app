import { useState, useEffect } from "react";
import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm/ColorForm";

import "./App.css";

function App() {
  const [colors, setColors] = useState(() => {
    const savedColors = localStorage.getItem("colors");
    return savedColors ? JSON.parse(savedColors) : initialColors;
  });

  useEffect(() => {
    localStorage.setItem("colors", JSON.stringify(colors));
  }, [colors]);

  function handleAddColor(newColor) {
    setColors([newColor, ...colors]);
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

      <ColorForm className="color-form" onAddColor={handleAddColor} />
      <div className="colorTheme">
        {colors.length === 0 ? (
          <p className="color-card-highlight">
            No colors yet... Start by adding one!
          </p>
        ) : (
          <ul>
            {colors.map((color) => (
              <li className="color-form-list" key={color.id}>
                <Color
                  id={color.id}
                  color={color}
                  //hex={color.hex}
                  role={color.role}
                  contrastText={color.contrastText}
                  onDeleteColor={handleDeleteColor}
                  onEditColor={handleEditColor}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default App;
