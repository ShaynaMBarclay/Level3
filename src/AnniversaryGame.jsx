import { useState, useEffect } from "react";

export default function Game() {
  const [catPos, setCatPos] = useState({ x: 50, y: 50 });
  const [activeKeys, setActiveKeys] = useState({});
  const [currentObstacle, setCurrentObstacle] = useState(0);
  const [showModal, setShowModal] = useState(null);
  const [endGame, setEndGame] = useState(false);

  const objects = [
    { x: 100, y: 100, text: "Memory 1", img: "pic1.jpg" },
    { x: 250, y: 200, text: "Memory 2", img: "pic2.jpg" },
    { x: 400, y: 120, text: "Memory 3", img: "pic3.jpg" },
  ];

  const finishLine = { x: 450, y: 300 };

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

        newPos.x = Math.max(0, Math.min(500 - 40, newPos.x));
        newPos.y = Math.max(0, Math.min(400 - 40, newPos.y));

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
            setEndGame(true);
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
      <div className="game-area">
        {!endGame ? (
          <>
            <div
              className="cat"
              style={{ top: catPos.y, left: catPos.x }}
            >
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
                  <img src={showModal.img} alt="memory" />
                  <p>{showModal.text}</p>
                  <button onClick={handleCloseModal}>Close</button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="end-screen">
            <h1>🎉 Level 3 Complete 🎉</h1>
            <p>Forever unlocked ❤️</p>
            <div className="collage">
              <img src="yourPic1.jpg" alt="memory" />
              <img src="yourPic2.jpg" alt="memory" />
              <img src="yourPic3.jpg" alt="memory" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
