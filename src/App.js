//React Components
import React from "react";
import NavBar from "./Components/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Widget, addResponseMessage } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import Home from "./Pages/Home";
import LandingPage from "./Pages/LandingPage";
import User from "./Pages/User";
import "./App.css";

const handleNewUserMessage = (newMessage) => {
  addResponseMessage("Hey");
};

export default function App() {
  return (
    <Router>
      <NavBar />
      <Widget
        handleNewUserMessage={handleNewUserMessage}
        title="CHATBOT"
        subtitle="Ask me"
      />
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
