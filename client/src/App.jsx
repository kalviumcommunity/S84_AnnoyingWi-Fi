import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; //installed React Router dom
import Home from "./Pages/Home";


const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
  );
};

export default App;
