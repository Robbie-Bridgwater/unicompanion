import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/home";
import Calendar from "./pages/calendar";
import sportsAndSocieties from "./pages/sportsAndSocieties";
import Account from "./pages/Account";

import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Wrapper from "./components/Wrapper";

function App() {
  return (
    <Router>
      <div>
        <Sidebar />
        <Wrapper>
          <Route exact path="/" component={Home} />
          <Route exact path="/calendar" component={Calendar} />
          <Route
            exact
            path="/sportsAndSocieties"
            component={sportsAndSocieties}
          />
          <Route exact path="/Account" component={Account} />
          <Route exact path="/About" component={About} />
        </Wrapper>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
