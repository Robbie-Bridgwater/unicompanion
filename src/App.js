import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/home";
import Calendar from "./pages/calendar";
import sportsAndSocieties from "./pages/sportsAndSocieties";
import Account from "./pages/Account";

import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import Wrapper from "./components/Wrapper";
// import "./App.css";


function App() {
  return (
    <Router>
      <div>
        <Navbar/> 
        <Wrapper>
        <Route exact path="/" component={Home} />
          <Route exact path="/calendar" component={Calendar} />
          <Route exact path="/sportsAndSocieties" component={sportsAndSocieties} />
          <Route exact path="/Account" component={Account} />
          <Route exact path="/About" component={About} />
        </Wrapper>
        <Footer />
      </div>
    </Router>
  );
}

export default App;