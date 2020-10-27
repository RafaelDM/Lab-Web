  
import React from "react";
import App from "../App";
import { useAuth0 } from '@auth0/auth0-react';
import "./some.css";
const Login = () => {
    const {isAuthenticated, isLoading} = useAuth0();
    
    if(isLoading)
    return <div>Loading...</div>
    
    if(isAuthenticated){
      return (
        <App/>
      )
    }
    else{
      return(
        <LoginButton/>
      )
    }
  
  }
  
  const LoginButton = () =>{
    
    const {loginWithRedirect} = useAuth0();
  
    return (
  
      <div class="text-center">
        <br></br>
        <h1>Bienvenido a Petifind</h1>
        <br></br>
        <button type="button" class="btn btn-primary btn-lg" onClick={ () => loginWithRedirect()}>
          Log In
        </button>
      </div>
    )
  }

  class Autenticar extends React.Component {
    render() {
        return (
          <div className="loginPage">
          <Login/>
          </div>
        );
      }
  }

  export default Autenticar;