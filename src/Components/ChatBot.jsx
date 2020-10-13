import React from 'react';
import { Widget, renderCustomComponent} from "react-chat-widget";
import 'react-chat-elements/dist/main.css';
import axios from "axios";
import ReactHtmlParser from 'react-html-parser';
import "./../App.css";
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.css';
import Carrousel from "./Carousel";

class Translate extends React.Component{
  render(){
    return (
      <div className="burbujita">
      {ReactHtmlParser(this.props.text)}
      </div>);
      }}

class Chat extends React.Component{
    handleNewUserMessage=(newMessage)=>{
    this.handleSubmit(newMessage)};

  handleSubmit=(message)=>{
    axios.post("http://127.0.0.1:5002/getMessage", { 
      message 
    }).then((res)=>{
      console.log(res.data);
      renderCustomComponent(Translate, {text: res.data.text});
    });
  };
  render(){
    return(
      <Widget
        handleNewUserMessage={this.handleNewUserMessage}
        title="CHATBOT"
        subtitle="Ask me"
        />
        //<Carrousel dogTitle={"Hola Soy un perro"} imageCar={"https://64.media.tumblr.com/fa7297b4cb7a85476ff749055da39615/bd1377c44bd08281-94/s540x810/a1ef2f725ab1ea344023eaefde5c8af972634c1d.gifv"}/>
    )
  }
}
export default Chat;