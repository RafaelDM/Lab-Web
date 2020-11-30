import React from "react";
import { Navbar, Nav, Form, FormControl} from "react-bootstrap";
//import "bootstrap/dist/css/bootstrap.min.css";
import LogoutButton from './Logout';
import "./some.css";

class NavBarAdmin extends React.Component {
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
        
        <h1 className="logoPeti">
        PetiFind
        </h1>
        
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
          <Nav.Link href="/Admin">Admin</Nav.Link>
          <Nav.Link href="/Allintents">All intents</Nav.Link>
          <Nav.Link href="/UnrecognizedMessages">Mensajes no reconocidos</Nav.Link>
          {/* <Nav.Link href="/AdminDos">AdminDos</Nav.Link> */}
        </Nav>
        <LogoutButton/>
      </Navbar>
    );
  }
}
export default NavBarAdmin;