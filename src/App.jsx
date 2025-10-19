import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Prediction from "./pages/Prediction";
function App() {
  return (
    <Router>
      {/* Navbar */}
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/" style={{ marginRight: "10px" }}>Home</Link>
        <Link to="/prediction">Prediction</Link>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prediction" element={<Prediction />} />
      </Routes>
    </Router>
  );
}

export default App;
