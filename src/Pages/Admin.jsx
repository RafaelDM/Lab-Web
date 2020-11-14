import React, {useState, useEffect} from "react";
import {Container, Col, Row} from 'react-bootstrap';
import Chart from "../Components/Chart.jsx";
import "../App.css";

let data1

export default function Admin() {

  const [data, setData] = useState();

  useEffect(() => {
    fetch('http://127.0.0.1:5002/getAnalytics').then(response => 
    response.json().then(data =>{
      data1 = data;
      //setData(data);
      //console.log(data1);
    }) );
  }
  , []);


    return (
      <div className="cardRow">
        <Container fluid="md">
        <Row>
          <Col></Col>
          <Col></Col>

                <Chart legendPosition="bottom" data= {data1}/>
          <Col></Col>
        </Row>
        </Container>

    </div>
   );
}