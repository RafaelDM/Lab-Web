import React from 'react';
import "./some.css";
import { Carousel ,Card} from "react-bootstrap";

function Carusel({image1, pC1, pri1, image2, pC2, pri2, image3, pC3, pri3}){
        return(
            <>
                <Carousel style={{width: '200px', height:'200px'}} className="elCarousel">
                    <Carousel.Item>
                        <Card style={{ width: '100%' }}>
                            <Card.Img style={{ height: '100px' }} src={image1} />
                            <Card.Body>
                                <Card.Title>{pC1}</Card.Title>
                            <Card.Text>
                                {pri1}
                            </Card.Text>
                            </Card.Body>
                        </Card>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Card style={{ width: '100%' }}>
                            <Card.Img style={{ height: '100px' }}  src={image2} />
                            <Card.Body>
                            <Card.Title>{pC2}</Card.Title>
                            <Card.Text>
                                {pri2}
                            </Card.Text>
                            </Card.Body>
                        </Card>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Card style={{ width: '100%' }}>
                            <Card.Img style={{ height: '100px' }}  src={image3} />
                            <Card.Body>
                            <Card.Title>{pC3}</Card.Title>
                            <Card.Text>
                                {pri3}
                            </Card.Text>
                            </Card.Body>
                        </Card>
                    </Carousel.Item>
                </Carousel>
            </>
        ) 
}
export default Carusel;