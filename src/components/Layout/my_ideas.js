import React, { Component } from 'react';
import './my_ideas.css';
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import {
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavItem,
    MDBNavLink,
    MDBNavbarToggler,
    MDBCollapse,
    MDBMask,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBBtn,
    MDBView,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBFormInline,
    MDBAnimation
} from "mdbreact";
import Ideaforms from './Ideaforms';
import Aux from '../../hoc/Auxiliary';
import Cookies from 'js-cookie';
const jwt = require('jsonwebtoken');

const mainurl = 'https://gentle-retreat-77560.herokuapp.com';
//const mainurl = 'http://localhost:5000';//


class my_ideas extends Component {
    state = {
        collapseID: "",
        records: [],
        link: '',
        email: '',
        Redirect: false
    };

    componentDidMount() {
        const token = Cookies.get('jwttoken');
        var decodedtoken;
        try {
            decodedtoken = jwt.verify(token, 'heyphil123');
        } catch (err) {
            console.log(err);
        }
        if (decodedtoken.loggedin) {
            this.setState({
                email: decodedtoken.email
            });
        }

        var url = mainurl + '/idea/getmyideas/' + decodedtoken.email;
        console.log(url);
        fetch(url)
            .then(res => {
                return res.json();
            })
            .then(resdata => {
                var { ideaidlist } = resdata;
                ideaidlist.forEach(id => {
                    fetch(mainurl + '/idea/getidea/' + id)
                        .then(res => {
                            return res.json();
                        })
                        .then(resdata => {
                            this.state.records.push(resdata);
                            //console.log(resdata);
                            this.setState({
                                Redirect: true
                            });
                        });
                });
            })
            .catch(err => {
                console.log(err);
            });

    }


    toggleCollapse = collapseID => () =>
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ""
        }));

    render() {
        const overlay = (
            <div
                id="sidenav-overlay"
                style={{ backgroundColor: "transparent" }}
                onClick={this.toggleCollapse("navbarCollapse")}
            />
        );

        //console.log(this.state.records);
        const ideas = this.state.records.map((record, index) => {
            return <Ideaforms
                email={this.state.email}
                problem={record.idea.Problem}
                upvote={record.idea.upvote}
            //onUpvote={this.upvotebuttonHandler.bind(this, record.id)}
            />
        });

        return (
            <div>
                {ideas}
            </div>
        );
    }
}


export default my_ideas;