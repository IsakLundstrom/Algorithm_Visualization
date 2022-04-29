import React, { useState } from "react";

export const SortingCell = (props) => {
  // console.log(props);
  return (
    <div
      style={{
        height: (100 / props.arrayLen) * props.height + "%",
        backgroundColor: props.color,
        borderRadius: 100 / props.arrayLen + "px",
        marginTop: "auto",
      }}
      key={props.height}
    >
      {}
    </div>
  );
};
