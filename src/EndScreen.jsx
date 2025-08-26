import { useEffect } from "react";
import { Link } from "react-router-dom";
import wow from "./assets/wow.jpeg";
import italy from "./assets/italy.jpeg";
import france from "./assets/france.jpeg";
import victorySound from "./assets/love.mp3"; 

export default function EndScreen() {
  useEffect(() => {
    const victoryAudio = new Audio(victorySound);
    victoryAudio.play();

    return () => {
      victoryAudio.pause();
      victoryAudio.currentTime = 0; 
    };
  }, []);

  return (
    <div className="end-screen">
      <h1>🎉 3 years, Complete! 🎉</h1>
      <p>Forever, in every universe, unlocked ❤️</p>
      <div className="collage">
        <img src={wow} alt="memory 1" />
        <img src={italy} alt="memory 2" />
        <img src={france} alt="memory 3" />
      </div>
      <Link to="/">
        <button className="restart-btn">🏠 Back to Start</button>
      </Link>
    </div>
  );
}