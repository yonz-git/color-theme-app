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

  //     function handleEditColor(idToEdit) {

  // const [edit, setEdit] = useState("");

  //   }
  return (
    <>
      <h1>Theme Creator</h1>

      <ColorForm className="color-form" onSubmitColor={handleAddColor} />
      <div className="colorTheme">
        {colors.length === 0 ? (
          <p className="color-card-highlight">
            No colors in your theme yet... Start by adding one!!
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
