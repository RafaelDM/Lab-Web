import React  from "react";
import NavBar from "./Components/NavBar";
import { BrowserRouter as Router, Switch, Route , Redirect} from "react-router-dom";
import "react-chat-widget/lib/styles.css";
import Home from "./Pages/Home";
import User from "./Pages/User";
import Admin from "./Pages/Admin";
import "./App.css";
import Chat from "./Components/ChatBot";
import "bootstrap/dist/css/bootstrap.css";
import 'bootstrap/dist/css/bootstrap.min.css';

 import {Container, Col, Row} from 'react-bootstrap';

export default function App() {
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
    </div>
      <Switch>
      <Route exact path="/">
          <Redirect to="/Home" />
        </Route>
      <Route path="/home" component={Home}/>
      <Route path="/user" component={User}/>
      <Route path="/admin" component={Admin}/>
      </Switch>
  </Router>
  );
}