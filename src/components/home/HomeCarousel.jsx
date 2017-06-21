import React, {Component} from 'react';
import { Carousel } from 'react-bootstrap';


const expressions = {
    Dijkstra:       {
                        title: 'Edsger Dijkstra',
                        exp: "Simplicity is prerequisite for reliability."
                    },
    DonaldKnuth:    {
                        title: 'Donald Knuth',
                        exp: 'An algorithm must be seen to be believed.'
                    },
    LinusTorvalds: {
                        title: 'Linus Torvalds',
                        exp: 'Good programmers worry about data structures and their relationship.'
                    },
    

}


class HomeCarousel extends Component {

    render () {
        return (
                <Carousel style={this.props.style} >
                    <Carousel.Item>
                        <CustomItem alt="Edsger Wybe Dijkstra"  title={expressions.Dijkstra.exp} text={expressions.Dijkstra.title} />
                    </Carousel.Item>
                    <Carousel.Item>
                        <CustomItem alt="Alan Turing" title={expressions.DonaldKnuth.exp} text={expressions.DonaldKnuth.title} />
                    </Carousel.Item>
                    <Carousel.Item>
                        <CustomItem alt="Linus Torvalds" title={expressions.LinusTorvalds.exp} text={expressions.LinusTorvalds.title} />
                    </Carousel.Item>
                </Carousel>
        )
    };
}

export default HomeCarousel;


function CustomItem(props) {
    return (
            <div>
                <img alt={props.alt} src="/images/Blackboard.jpg" width="100%" height="400" />
                <CustomCaption title={props.title} text={props.text}/>
            </div>
        );
}


function CustomCaption(props) {
    return (
            <Carousel.Caption style={{position: 'absolute', top: '20%'}}>
                <h3 style={{textAlign: 'justify', textIndent: '30px', letterSpacing: '1px', 
                            font: '3em "Merienda One", Helvetica, sans-serif'}} >{props.title}</h3>
                <h4 style={{textAlign: 'right', letterSpacing: '2px', wordSpacing: '16px', color: '#ffccb3',
                            font: '2em "Berkshire Swash", Helvetica, sans-serif'}} >{'/ ' + props.text + ' /'}</h4>
            </Carousel.Caption>
    );
}



