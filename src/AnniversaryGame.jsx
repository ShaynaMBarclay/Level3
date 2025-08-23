import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import wow1 from "./assets/wow1.jpeg";
import wow2 from "./assets/wow2.jpeg";


export default function AnniversaryGame() {
  const navigate = useNavigate();
  const gameRef = useRef(null);
  const [catPos, setCatPos] = useState({ x: 50, y: 50 });
  const [activeKeys, setActiveKeys] = useState({});
  const [currentObstacle, setCurrentObstacle] = useState(0);
  const [showModal, setShowModal] = useState(null);

  const gameWidth = 600;
  const gameHeight = 700;

  const objects = [
    {
      x: 100,
      y: 100,
      text: "Date Night in Suramar. We weren't together irl yet but we had dates that were just as meaningful in our favorite place.",
      imgs: [wow1, wow2],
    },
    { x: 250, y: 300, text: "Memory 2", imgs: [] },
    { x: 400, y: 500, text: "Memory 3", imgs: [] },
  ];

  const finishLine = { x: 500, y: 650 };

  useEffect(() => {
    const down = (e) =>
      setActiveKeys((prev) => ({ ...prev, [e.key.toLowerCase()]: true }));
    const up = (e) =>
      setActiveKeys((prev) => ({ ...prev, [e.key.toLowerCase()]: false }));

    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);

    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  useEffect(() => {
    const speed = 4;
    const interval = setInterval(() => {
      setCatPos((prev) => {
        let newPos = { ...prev };
        if (activeKeys["w"]) newPos.y -= speed;
        if (activeKeys["s"]) newPos.y += speed;
        if (activeKeys["a"]) newPos.x -= speed;
        if (activeKeys["d"]) newPos.x += speed;

        newPos.x = Math.max(0, Math.min(gameWidth - 40, newPos.x));
        newPos.y = Math.max(0, Math.min(gameHeight - 40, newPos.y));

        if (currentObstacle < objects.length) {
          const obj = objects[currentObstacle];
          if (
            Math.abs(newPos.x - obj.x) < 40 &&
            Math.abs(newPos.y - obj.y) < 40
          ) {
            setShowModal(obj);
          }
        } else {
          if (
            Math.abs(newPos.x - finishLine.x) < 40 &&
            Math.abs(newPos.y - finishLine.y) < 40
          ) {
            navigate("/end");
          }
        }

        return newPos;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [activeKeys, currentObstacle]);

  const handleCloseModal = () => {
    setShowModal(null);
    setCurrentObstacle((prev) => prev + 1);
  };

  return (
    <div className="screen">
      <div
        className="game-area"
        ref={gameRef}
        style={{ width: gameWidth, height: gameHeight }}
      >
        <div className="cat" style={{ top: catPos.y, left: catPos.x }}>
          🐱
        </div>

        {currentObstacle < objects.length && (
          <div
            className="object"
            style={{
              top: objects[currentObstacle].y,
              left: objects[currentObstacle].x,
            }}
          >
            🌟
          </div>
        )}

        {currentObstacle >= objects.length && (
          <div
            className="finish-line"
            style={{ top: finishLine.y, left: finishLine.x }}
          >
            🏁
          </div>
        )}

        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <h2 className="modal-title">✨ Memory ✨</h2>
              <div className="modal-images">
                {showModal.imgs.map((img, i) => (
                  <img key={i} src={img} alt={`memory-${i}`} />
                ))}
              </div>
              <p className="modal-text">{showModal.text}</p>
              <button className="modal-btn" onClick={handleCloseModal}>
                Continue ➡️
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
