import React from "react";
import "./App.css";
import Home from "./components/Home";
import Player from "./components/Player";
import News from "./components/News";
import { Route, BrowserRouter as Router, Switch, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Route path="/" exact component={Home} />
        <Route path="/Player" exact component={Player} />
        <Route path="/News" exact component={News} />
      </div>
    </Router>
  );
}

export default App;
