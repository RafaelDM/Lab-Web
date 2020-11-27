import React  from "react";
import NavBar from "./Components/NavBar";
import NavBarAdmin from "./Components/NavBarAdmin";
import { BrowserRouter as Router, Switch, Route , Redirect} from "react-router-dom";
import "react-chat-widget/lib/styles.css";
import Home from "./Pages/Home";
import User from "./Pages/User";
import Admin from "./Pages/Admin";
import AdminDos from "./Pages/AdminDos";
import "./App.css";
import Chat from "./Components/ChatBot";
import "bootstrap/dist/css/bootstrap.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth0 } from '@auth0/auth0-react';
import {Container, Col, Row} from 'react-bootstrap';
var administradores= "Nayra 1316 Edu Balez isa mqd"

export default function App() {
  
  const {user} = useAuth0();
  if(administradores.includes(user.name)){
    return (
      <Router>
      <div className="App">
        <div className="navBar">
        <NavBarAdmin/>
        </div>
        <Container>
            <Row>
              <Col> <Col md={{ span: 3, offset: 8 }}><Chat></Chat></Col></Col>
            </Row>
  
        </Container>
        <Switch>
        <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        <Route path="/home" component={Home}/>
        <Route path="/user" component={User}/>
        <Route path="/Admin" component={Admin}/>
        <Route path="/AdminDos" component={AdminDos}/>
        </Switch>
        </div>
        </Router>
    );
  }
      else{
        return (
          <Router>
          <div className="App">
            <div className="navBar">
            <NavBar/>
            </div>
            <Container>
                <Row>
                  <Col> <Col md={{ span: 3, offset: 8 }}><Chat></Chat></Col></Col>
                </Row>
  
            </Container>
            <Switch>
            <Route exact path="/">
                <Redirect to="/home" />
              </Route>
            <Route path="/home" component={Home}/>
            <Route path="/user" component={User}/>
            <Route path="/admin" component={Admin}/>
            </Switch>
            </div>
            </Router>
        );
      }
}