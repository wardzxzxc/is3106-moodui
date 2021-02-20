import React, { Component } from 'react';
import Styles from './styles/SearchByUserHeader.css';
import {
    Grid,
    Row,
    Col,
    Form,
} from "react-bootstrap";
import { FaSearch } from 'react-icons/fa'

class SearchByUserHeader extends Component {
    state = {};
    render() {
        return (
            <div className="SearchByUserHeaderContent-wrapper">

            <Grid fluid={true} >
            <Row>
                <Col lg={9} sm={12}>
                  <text className="SearchByUserHeaderTitle">Connections</text>
                </Col>
                <Col lg={3} sm={12}> 
                <Form className="search-by-user-header-form-control">
                    <input className="header-active-cyan-2 "  type="text" placeholder="Search By Username" aria-label="Search" />
                    <a href="#" className="active-cyan-2-fa"><FaSearch/> </a>
                </Form>  
                </Col>
            </Row>    
            </Grid>

            </div>
        )
    }
}
export default SearchByUserHeader;