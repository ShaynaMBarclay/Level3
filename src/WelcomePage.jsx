import { Link } from "react-router-dom";

function WelcomePage({ startMusic }) {
  return (
    <div className="welcome-container">
      <h1>💖 Level 3: Anniversary Edition 💖</h1>
      <p>Welcome to our 3-Year Anniversary Adventure 🎉</p>
      <p>Press start to begin your journey...</p>

      <Link to="/anniversary">
        <button className="start-btn" onClick={startMusic}>
          ▶ Start Game
        </button>
      </Link>
    </div>
  );
}

export default WelcomePage;
