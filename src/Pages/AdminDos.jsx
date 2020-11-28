import React from "react";
import {Container, Col, Row} from 'react-bootstrap';
import Chart2 from "../Components/Chart2.jsx";
import "../App.css";



export default function AdminDos() {




    return (
      <div className="cardRow">
        <Container fluid="md">
        <Row>
          <Col></Col>
          <Col></Col>

                <Chart2 legendPosition="bottom" />
          <Col></Col>
        </Row>
        </Container>

    </div>
   );
}