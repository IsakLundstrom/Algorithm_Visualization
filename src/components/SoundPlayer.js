import React from "react";
import useSound from "use-sound";
import { AppContainer } from "./AppContainer";
import sound from "./pianoA.mp3";

export const SoundPlayer = (props) => {
  const [playbackRate, setPlaybackRate] = React.useState(1);

  const [play] = useSound(sound, {
    playbackRate,
    interrupt: true,
    volume: 0.2,
  });

  function playSound(pitch) {
    console.log(pitch);
    setPlaybackRate(pitch);
    play();
  }
  return <AppContainer playSound={playSound}></AppContainer>;
};
