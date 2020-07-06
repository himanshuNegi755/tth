import React, {Component} from 'react';
import {Carousel} from 'react-bootstrap';

class TestProduct extends Component{
    
    render() {
        return (
            <Carousel>
                <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src="https://www.wakeupwithzest.com/wp-content/uploads/2018/04/website-images-800-x-400-px-2.png"
                      alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="https://live.staticflickr.com/5477/12523460305_4abe16b285_c.jpg"
                    alt="Second slide"
                    />
                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="https://www.rotundakingston.co.uk/wp-content/uploads/2018/06/kung-fu-800x400px.jpg"
                    alt="Third slide"
                    />
                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        );
    }
}

export default TestProduct;