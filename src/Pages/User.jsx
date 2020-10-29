import React from "react";
import {Container, Col, Row, Card, Image, Button} from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';





export default function Home (){



const { user } = useAuth0();
 
console.log(user);
    return (

      <Container fluid="md">
        <Row>


          <Col md={{ span: 6, offset: 4 }}>

          <Card bg="light" text="dark" style={{ width: '18rem' }}>
            <Card.Img variant="top" src={user.picture} />
              <Card.Body>
                <Card.Title>{user.name}</Card.Title>
                <Card.Text>
                 {user.email}
                </Card.Text>
                <Button variant="secondary" href = "/home">Home</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

    );
  
}

//
//
//<Image src="holder.js/171x180" roundedCircle />