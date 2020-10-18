import React from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {useAuth0} from '@auth0/auth0-react';
import LoginButton from './LogIn';
import LogoutButton from './Logout';

class NavBar extends React.Component {
  constructor(props) {
    
    super(props);
    this.state = {
      search: "Que buscamos?",
    };
  }
  
  searchItem = (params) => {
    this.setState({
      search: params.target.value,
    });
  };
  

  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">NDS</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="/user">User</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl
            type="text"
            onChange={this.searchItem}
            placeholder="Search"
            className="mr-sm-2"
          />
          <Button variant="outline-info">Search</Button>
          <LoginButton/>
          <LogoutButton/>
        </Form>
      </Navbar>
    );
  }
}
export default NavBar;
