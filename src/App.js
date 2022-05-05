import "./App.css";
import { AppContainer } from "./components/AppContainer";
import { SoundPlayer } from "./components/SoundPlayer";

function App() {
  return (
    <div className="App">
      {/* <div className="sortingContainer"></div> */}
      {/* <SettingsBar></SettingsBar> */}
      <SoundPlayer></SoundPlayer>
    </div>
  );
}

export default App;
