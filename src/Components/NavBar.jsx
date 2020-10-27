import React from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
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
      <Navbar  variant="dark" >
        <h3 className="logoPeti">
        PetiFind
        </h3>
        <Form inline>
          <FormControl
            type="text"
            onChange={this.searchItem}
            placeholder="Search"
            className="searchBar"
          />
          
        </Form>
        <Nav className="mr-auto">
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="/user">User</Nav.Link>
        </Nav>
        <LogoutButton/>
      </Navbar>
    );
  }
}
export default NavBar;