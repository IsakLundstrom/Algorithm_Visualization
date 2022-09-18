import { useState } from "react";
import { shuffle } from "./algorithms/shuffle";
import { SortingCellGrid } from "./SortingCellGrid";
import "./style.css";

export const SettingsBar = () => {
  const [array, setArray] = useState([1, 2, 8, 4, 3, 6, 5, 9, 7, 11, 10, 12]);

  async function bblSort(arr) {
    for (var i = 0; i < arr.length; i++) {
      // Last i elements are already in place
      for (var j = 0; j < arr.length - i - 1; j++) {
        // Checking if the item at present iteration
        // is greater than the next iteration
        if (arr[j] > arr[j + 1]) {
          // If the condition is true then swap them
          var temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          setArray([...arr]);
          await delay(50);
        }
      }
    }
    // Print the sorted array
    console.log(arr);
  }
  const delay = async (ms) => new Promise((res) => setTimeout(res, ms));

  return (
    <main>
      <div className="sortingCellGridContainer" onChange={setArray}>
        <SortingCellGrid array={array}></SortingCellGrid>
      </div>
      <p>{array}</p>
      <button onClick={() => bblSort(array)}>Run QuickSort</button>
      <button className="algorithmButton">Choose Algorithm</button>
      <input type="range" min="1" max="100" defaultValue="50" className="amountRange"></input>
      <input type="range" min="10" max="100" defaultValue="50" className="speedRange"></input>
      <button className="shuffleButton" onClick={() => setArray(shuffle(array))}>
        Shuffle
      </button>
      <button className="runButton">Run</button>
    </main>
  );
};
