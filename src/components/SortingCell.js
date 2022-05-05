import React from "react";
import useSound from "use-sound";
export const SortingCell = (props) => {
  const [playbackRate, setPlaybackRate] = React.useState(
    props.height / props.arrayLen + 0.5
  );
  const [play] = useSound(props.sound, {
    playbackRate,
    interrupt: true,
    volume: 0.2,
  });

  function handleSound() {
    // console.log("sound", props.color !== "#989c94");
    if (props.color !== "#989c94") play();
  }
  handleSound();
  return (
    <div
      style={{
        height: (100 / props.arrayLen) * props.height + "%",
        backgroundColor: props.color,
        borderRadius: 100 / props.arrayLen + "px",
        marginTop: "auto",
      }}
    >
      {/* <button onClick={() => handleSound()}>B</button> */}
    </div>
  );
};
