import React, { Component } from 'react';
import Styles from './styles/ConnectionsAlbum.css';
import Slider from "react-slick";
import {
    Row,
    Col,
    Image,
    Button
} from "react-bootstrap";



class ConnectionsAlbum extends Component {
    state = {};

    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 3
        };
        return (

            <div className="ConnectionsAlbumContent-wrapper">
                <div className="ConnectionsAlbumSecond-row">
                    <Row className="ConnectionsAlbumFirst-row">
                        <Col lg={2} sm={12} >
                            <Image className="ConnectionsAlbumLogoSize" src="images/bfast.jpg" circle />
                        </Col>
                        <Col lg={10} sm={12} >
                            <text className="ConnectionsAlbumTitle"> Kwok Jia Hui </text>
                            <div>
                                <a className="ConnectionsAlbumDescription" href="#"> @kwokjiahui </a>
                                <Button bsClass="ConnectionsAlbumButton ConnectionsAlbumMidSize" type="submit">Following</Button>
                            </div>
                            <div>
                                <Button bsClass="ConnectionsAlbumButtonLargeSize ConnectionsAlbumButtonMidSize" type="submit">Following</Button>
                            </div>
                        </Col>
                    </Row>
                    <Slider {...settings}>
                        <div>
                            <Image className="ConnectionsAlbumImageSize " src="images/chrome1.png" rounded />
                            <div>
                                <text className="ConnectionsAlbumAppName">App Name #1</text>
                            </div>
                        </div>
                        <div>
                            <Image className="ConnectionsAlbumImageSize " src="images/chrome2.png" rounded />
                            <div className="ConnectionsAlbumImageSize">
                                <text className="ConnectionsAlbumAppName">App Name #2</text>
                            </div>

                        </div>
                        <div>
                            <Image className="ConnectionsAlbumImageSize " src="images/chrome3.png" rounded />
                            <div className="ConnectionsAlbumImageSize">
                                <text className="ConnectionsAlbumAppName">App Name #2</text>
                            </div>

                        </div>
                        <div>
                            <Image className="ConnectionsAlbumImageSize " src="images/chrome4.png" rounded />
                            <div className="ConnectionsAlbumImageSize">
                                <text className="ConnectionsAlbumAppName">App Name #2</text>
                            </div>

                        </div>
                        <div>
                            <Image className="ConnectionsAlbumImageSize " src="images/chrome5.png" rounded />
                            <div className="ConnectionsAlbumImageSize">
                                <text className="ConnectionsAlbumAppName">App Name #2</text>
                            </div>

                        </div>
                        <div>

                            <Image className="ConnectionsAlbumImageSize " src="images/CoinKeeper1.png" rounded />
                            <div className="ConnectionsAlbumImageSize">
                                <text className="ConnectionsAlbumAppName">App Name #2</text>
                            </div>
                        </div>
                        <div>

                            <Image className="ConnectionsAlbumImageSize " src="images/CoinKeeper2.png" rounded />
                            <div className="ConnectionsAlbumImageSize">
                                <text className="ConnectionsAlbumAppName">App Name #2</text>
                            </div>

                        </div>
                        <div>

                            <Image className="ConnectionsAlbumImageSize " src="images/CoinKeeper3.png" rounded />
                            <div className="ConnectionsAlbumImageSize">
                                <text className="ConnectionsAlbumAppName">App Name #2</text>
                            </div>

                        </div>
                        <div>

                            <Image className="ConnectionsAlbumImageSize " src="images/CoinKeeper4.png" rounded />
                            <div className="ConnectionsAlbumImageSize">
                                <text className="ConnectionsAlbumAppName">App Name #2</text>
                            </div>

                        </div>
                    </Slider>
                </div>
            </div>

        )
    }
}
export default ConnectionsAlbum;

