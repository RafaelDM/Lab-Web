import React from 'react';
import { Widget, renderCustomComponent} from "react-chat-widget";
import 'react-chat-elements/dist/main.css';
import axios from "axios";
import ReactHtmlParser from 'react-html-parser';
import "./../App.css";
import 'bootstrap/dist/css/bootstrap.css';
import parse from 'html-react-parser';
import renderHTML from 'react-render-html';
import Carusel from "./Carousel";

class Translate extends React.Component{
  render(){
    console.log(this.props.text);

    if(this.props.text.includes('carousel')){
      var completo= this.props.text.split(',');
      console.log(completo);
      var im1 =completo[0]
      var pc1 =completo[1]
      var pr1 =completo[2]
      var im2=completo[3]
      var pc2=completo[4]
      var pr2 =completo[5]
      var im3 =completo[6]
      var pc3=completo[7]
      var pr3=completo[8]

      //var imagen=completo[0]
      //var pCapt= completo[1]
      //var len= completo.length-1
      
      console.log('Entre Al Carousel');
      return (
        <div className="burbujita">
        <Carusel image1={im1} pC1={pc1} pri1={pr1} image2={im2} pC2={pc2} pri2={pr2} image3={im3} pC3={pc3} pri3={pr3} >

        </Carusel>
        </div>);
  }
    else{
      console.log('No entre Al Carousel');
    return (
      <div className="burbujita">
      {ReactHtmlParser(this.props.text)}
      </div>);
    }
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