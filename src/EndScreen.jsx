import { Link } from "react-router-dom";
import wow from "./assets/wow.jpeg";
import italy from "./assets/italy.jpeg";
import france from "./assets/france.jpeg";

export default function EndScreen() {
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
