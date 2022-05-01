import { SortingCell } from "./SortingCell";
import { v4 as uuidv4 } from "uuid";

export const SortingCellGrid = (props) => {
  let gapWidth = 200 / props.arrayNum.length;
  if (200 / props.arrayNum.length < 2) {
    gapWidth = 0;
  }
  const sortingCellsGrid = {
    display: "grid",
    height: "100%",
    // backgroundColor: "antiquewhite",
    gridTemplateColumns: "repeat(" + props.arrayNum.length + ", 1fr)",
    gap: gapWidth + "px",
  };
  // console.log(props.array.length);
  let i = -1;
  return (
    <div style={sortingCellsGrid}>
      {props.arrayNum.map((num) => {
        i++;
        // const cellProps = {
        //   height: num,
        //   arrayLen: props.arrayNum.length,
        // };
        // console.log(props.array.length);
        return (
          <SortingCell
            sound={props.sound}
            height={num}
            arrayLen={props.arrayNum.length}
            color={props.arrayColor[i]}
            key={uuidv4()}
          ></SortingCell>
        );
      })}
    </div>
  );
};
