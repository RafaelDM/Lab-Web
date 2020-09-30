import React from 'react';
import { Widget, renderCustomComponent} from "react-chat-widget";
import 'react-chat-elements/dist/main.css';
import axios from "axios";
import ReactHtmlParser from 'react-html-parser';
import "./../App.css";
import 'bootstrap/dist/css/bootstrap.css';

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
    )
  }
}
export default Chat;