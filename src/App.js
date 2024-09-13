import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/NavBar";
import Body from "./components/Body";
import MyAccount from "./components/MyAccount";
import Reminder from "./components/Remainder";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <div className="container">
        <Nav />
        <Body>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/my-account" element={<MyAccount />} />
              <Route path="/reminder" element={<Reminder />} />
            </Routes>
          </Router>
        </Body>
      </div>
    </div>
  );
}

export default App;
