import { Link } from "react-router-dom";

export default function EndScreen() {
  return (
    <div className="end-screen">
      <h1>🎉 Level 3 Complete 🎉</h1>
      <p>Forever unlocked ❤️</p>
      <div className="collage">
        <img src="yourPic1.jpg" alt="memory" />
        <img src="yourPic2.jpg" alt="memory" />
        <img src="yourPic3.jpg" alt="memory" />
      </div>
      <Link to="/">
        <button className="restart-btn">🏠 Back to Start</button>
      </Link>
    </div>
  );
}
