import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AnniversaryGame from "./AnniversaryGame";
import WelcomePage from "./WelcomePage";

import "./styles/App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} /> 
        <Route path="/anniversary" element={<AnniversaryGame />} />
      </Routes>
    </Router>
  );
}

export default App;
