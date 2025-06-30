import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; //installed React Router dom
import Home from "./Pages/Home";
import AddWifi from "./Pages/AddWifi";
import EditWifi from "./Pages/EditWifi";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-wifi" element={<AddWifi />} />
        <Route path="/edit-wifi/:id" element={<EditWifi />} />
      </Routes>
    </Router>
  );
};

export default App;
