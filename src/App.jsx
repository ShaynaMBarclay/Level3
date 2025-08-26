import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useRef } from "react"
import WelcomePage from "./WelcomePage";
import AnniversaryGame from "./AnniversaryGame";
import EndScreen from "./EndScreen";
import "./styles/App.css";
import bgMusicFile from "./assets/music.mp3";

function App() {
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(bgMusicFile);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5; // adjust volume
  }, []);

  const startMusic = () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .catch((err) => console.log("Autoplay prevented:", err));
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage startMusic={startMusic} />} />
        <Route path="/anniversary" element={<AnniversaryGame />} />
        <Route path="/end" element={<EndScreen />} />
      </Routes>
    </Router>
  );
}

export default App;