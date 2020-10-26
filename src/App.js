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
var im1 ="https://64.media.tumblr.com/e75b01432d133cb2422e92bef377f35a/02e5a41b764f71a8-55/s400x600/8045b3c658bb230d7f0c5b62e43e98f0edc3932f.jpg"
var pc1 = "Spoky"
var pr1 = "Jugueton y tierno"
var im2= "https://64.media.tumblr.com/381b4cdab2b002be27aca6b4c7e79488/567e02e110379364-bd/s400x600/d085fcb8e8a785de730e9453847fd004c53b5f00.jpg"
var pc2= "Pancho"
var pr2 = "Pasional y amoroso"
var im3 = "https://64.media.tumblr.com/ac6173751c1aacfb9dd5cfd6b7d05787/ffbe3bb4e963b2df-fd/s400x600/1fd2659ed693970663b29292403d4615ce4ab153.jpg"
var pc3= "Juan"
var pr3= "Mexicano y picoso"

export default function App() {
  const { isLoading } = useAuth0();
  if (isLoading) return <div>Loading...</div>
  return (

    <Router>
      
      <NavBar />
      <Carusel image1={im1} pC1={pc1} pri1={pr1} image2={im2} pC2={pc2} pri2={pr2} image3={im3} pC3={pc3} pri3={pr3} />

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