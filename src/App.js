//React Components
import React from "react";
import NavBar from "./Components/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Widget, addResponseMessage, renderCustomComponent} from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import ReactHtmlParser from 'react-html-parser';
import Home from "./Pages/Home";
import LandingPage from "./Pages/LandingPage";
import User from "./Pages/User";
import "./App.css";
import * as axios from 'axios';

const handleNewUserMessage = async (message) => {
  const { data } = await axios.post('http://127.0.0.1:5002/getMessage', {
    message
  });

  addResponseMessage(data.text);
};

/* Checa esto raziel xD*/
/*----------------------------------------------------------------------------------------------
jaja le cree el componente en el components*/
/*class Translate extends React.Component{
  render(){
    return (
      <div className="speech-bubble">
      {ReactHtmlParser(this.props.text)}
      </div>
    );
  }
}
class Chat extends React.Component{
  handleNewUserMessage=(newMessage)=>{
    this.handleSubmit(newMessage)
  };
  handleSubmit=(message)=>{
    axios.post("http://127.0.0.1:5002/getMessage", { message }).then((res)=>{
      console.log(res.data);
      renderCustomComponent(Translate, {text: res.data.text});
      return res.data;
    });
  };
}
*/
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
