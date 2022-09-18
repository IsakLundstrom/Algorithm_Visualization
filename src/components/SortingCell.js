import React from "react";
export const SortingCell = (props) => {
  return (
    <div
      style={{
        height: (100 / props.arrayLen) * props.height + "%",
        backgroundColor: props.color,
        borderRadius: 100 / props.arrayLen + "px",
        marginTop: "auto",
      }}
    ></div>
  );
};
