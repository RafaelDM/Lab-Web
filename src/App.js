import React from "react";
import NavBar from "./Components/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "react-chat-widget/lib/styles.css";
import ReactHtmlParser from 'react-html-parser';
import Home from "./Pages/Home";
import LandingPage from "./Pages/LandingPage";
import User from "./Pages/User";
import "./App.css";
import "./Components/ChatBot.js";
import Chat from "./Components/ChatBot.js";




export default function App() {
  return (
    <Router>
      <NavBar />

      <Chat/>
     
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/user">
          <User />
        </Route>
      </Switch>
    </Router>
  );
}