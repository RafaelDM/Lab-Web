import React,  {useState, useEffect} from "react";
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

import Post from "./Components/Post/Post";
import {db} from "./DB/firebase.jsx";


export default function App() {
  const [posts, setPosts] = useState([]);
  useEffect(()=>{
    db.collection('Posts').onSnapshot(snapshot=>{
      setPosts(snapshot.docs.map(doc=>({
        id: doc.id,
        post: doc.data()
      })));
    })
  },[]);
  return (

    <div className="App">
      <div className="navBar">
      <NavBar/>
      </div>
    <div className="row">

      
      <div className="column">
        {/* Columna Izquierda */}
      </div>

      <div className="column">

      {
      posts.map(({id, post})=>(
        <Post key={id} caption={post.caption} username={post.username} imageUrl={post.imageUrl}/>
      ))
      }
        </div>
    <div className="column">
      {/*Columna Derecha */}
      <Chat/>    
    </div>
  </div>
  </div>
  );
}