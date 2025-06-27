import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; //installed React Router dom
import Home from "./Pages/Home";
import AddWifi from "./Pages/AddWifi";


const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-wifi" element={<AddWifi />} />
        </Routes>
      </Router>
  );
};

export default App;
