import { useState } from "react";
import { quickSort } from "./algorithms/quickSort";

export const SettingsBar = () => {
  const [array, setArray] = useState([1, 2, 8, 4, 3, 6, 5, 9, 7]);
  return (
    <div className="settingsBar">
      <p>{array}</p>
      <p>{quickSort(array)}</p>
      <button className="algorithmButton">Run QuickSort</button>
      <button className="algorithmButton">Choose Algorithm</button>
      <input
        type="range"
        min="1"
        max="100"
        value="50"
        className="amountRange"
      ></input>
      <input
        type="range"
        min="10"
        max="100"
        value="50"
        className="speedRange"
      ></input>
      <button className="shuffleButton">Shuffle</button>
      <button className="runButton">Run</button>
    </div>
  );
};
