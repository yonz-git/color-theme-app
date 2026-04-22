import { useState } from "react";
import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm/ColorForm";

import "./App.css";

function App() {
  const [colors, setColors] = useState(initialColors);

  function handleAddColor(newColor) {
    setColors([newColor, ...colors]);
  }

  function handleDeleteColor(idToDelete) {
    setColors(colors.filter((color) => color.id !== idToDelete));
  }
  return (
    <>
      <h1>Theme Creator</h1>
      <ColorForm className="color-form" onSubmitColor={handleAddColor} />
      <div className="colorTheme">
        {colors.map((color) => (
          <Color
            key={color.id}
            color={color}
            onDeleteColor={handleDeleteColor}
          />
        ))}
      </div>
    </>
  );
}

export default App;
