import React from "react";
import {Container, Col, Row} from 'react-bootstrap';
import Chart from "../Components/Chart.jsx";



export default function Admin() {

    return (
        <Container fluid="md">
        <Row>
          <Col></Col>
          <Col></Col>

                <Chart />
          <Col></Col>
        </Row>
        </Container>


   );
}