import React,  {useState, useEffect} from "react";
import {Container, Col, Row, Card, Image, Button} from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import "../App.css";
import Post from "../Components/Post/Post";
import {db} from "../DB/firebase.jsx";

export default function User (){

const {user} = useAuth0();
const [posts, setPosts] = useState([]);

useEffect(()=>{
  db.collection("Posts")
  .where("username", "==", user.name)
  .onSnapshot(snapshot=>{
    setPosts(snapshot.docs.map(doc=>({
      id: doc.id,
      post: doc.data()
    })));
  })
},[]);


    return (
      <Container fluid="md">
        <Row>
          <Col md={{ span: 6, offset: 4 }}>
          <Card bg="light" text="dark" style={{ width: '18rem' } } className="mb-3">
            <Image 
              src = {user.picture}
              className = "card-img-top"
              fluid
              roundedCircle
            />
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


      <div className="cardRow">
  {
  posts.map(({id, post})=>(
      <Post key={id} caption={post.caption} username={post.username} imageUrl={post.imageUrl}/>
  ))
  }
</div>
</Container>
    );
}