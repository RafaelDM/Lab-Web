import React from "react";
import {Container, Col, Row} from 'react-bootstrap';
import Chart from "../Components/Chart.jsx";
import "../App.css";

export default function Admin() {

    return (
      <div className="cardRow">
        <Container fluid="md">
        <Row>
          <Col></Col>
          <Col></Col>

                <Chart legendPosition="bottom" />
          <Col></Col>
        </Row>
        </Container>

    </div>
   );
}