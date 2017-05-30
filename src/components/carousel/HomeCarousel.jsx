import React, {Component} from 'react';
import { Carousel } from 'react-bootstrap';


function CustomCaption(props) {
    return (
            <Carousel.Caption>
                <h3>{props.title}</h3>
                <p>{props.text}</p>
            </Carousel.Caption>
    );
}


function CustomItem(props) {
    return (
            <div>
                <img alt={props.alt} src={props.src} />
                {/* <CustomCaption title={props.title} text={props.text}/> */}
            </div>
        );
}


class HomeCarousel extends Component {

    render () {
        return (
                <Carousel>
                    <Carousel.Item>
                        <CustomItem alt="Edsger Wybe Dijkstra" src="/images/dijkstra_exp.jpg" title="First slide label" text="Nulla vitae elit libero, a pharetra augue mollis interdum."/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <CustomItem alt="Alan Turing" src="/images/alan_turing_exp.jpg" title="Second slide label" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <CustomItem alt="Linus Torvalds" src="/images/linus_torvalds_exp.jpg" title="Third slide label" text="Praesent commodo cursus magna, vel scelerisque nisl consectetur."/>
                    </Carousel.Item>
                </Carousel>
        )
    };
}

export default HomeCarousel;