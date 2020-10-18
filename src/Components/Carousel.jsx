import React from 'react';
//import "./Carousel.css";
import { Carousel ,Card} from "react-bootstrap";
function Carusel({image, pCaption}){

        return(
            <>
                <Carousel style={{width: '200px', height:'200px'}}>
                    <Carousel.Item>
                        <Card style={{ width: '100%' }}>
                            <Card.Img style={{ height: '100px' }} src={image} />
                            <Card.Body>
                                <Card.Title>{pCaption}</Card.Title>
                            <Card.Text>
                                &#36;299
                            </Card.Text>
                            </Card.Body>
                        </Card>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Card style={{ width: '100%' }}>
                            <Card.Img style={{ height: '100px' }}  src={image} />
                            <Card.Body>
                            <Card.Title>{pCaption}</Card.Title>
                            <Card.Text>
                                &#36;299
                            </Card.Text>
                            </Card.Body>
                        </Card>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Card style={{ width: '100%' }}>
                            <Card.Img style={{ height: '100px' }}  src={image} />
                            <Card.Body>
                            <Card.Title>{pCaption}</Card.Title>
                            <Card.Text>
                                &#36;299
                            </Card.Text>
                            </Card.Body>
                        </Card>
                    </Carousel.Item>
                </Carousel>
            
            </>
        ) 
}
export default Carusel;