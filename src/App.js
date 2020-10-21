import React from "react";
import NavBar from "./Components/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "react-chat-widget/lib/styles.css";
import Home from "./Pages/Home";
import LandingPage from "./Pages/LandingPage";
import User from "./Pages/User";
import "./App.css";
import Chat from "./Components/ChatBot";
import "bootstrap/dist/css/bootstrap.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Carusel from "./Components/Carousel";
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './Components/LogIn';

export default function App() {
  const { isLoading } = useAuth0();
  if (isLoading) return <div>Loading...</div>
  return (
    <Router>
      
      <NavBar />

      <Carusel image="https://i.stack.imgur.com/jZhAM.png" pCaption="Esto Cuesta dos pesos"/>

      <Chat/>
      <div>
      <LoginButton/>
      </div>
      <div>
      </div>
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