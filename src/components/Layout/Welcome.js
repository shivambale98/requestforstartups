import React, { Component } from 'react';
import './Welcome.css';
import { BrowserRouter as Router } from "react-router-dom";
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
import Pagination from './Pagination';


class Welcome extends Component {
  state = {
    collapseID: "",
    records: []
  };
//pagination
//const [currentPage, setCurrentPage] = useState(1);
  //const [postPerPage, setPostsPerPage] = useState(10);


//const indexOfLastPost = currentPage * postPerPage;
//const indexOfFirstPost = indexOfLastPost - postPerPage;
//const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);


//Change page 
//const paginate = pageNumber => setCurrentPage(pageNumber)

//pagination
  componentDidMount() {
    const url = 'http://localhost:5000/';
    fetch(url)
      .then(res => {
        return res.json();
      })
      .then(resdata => {
        this.setState({ records: resdata.recordlist });
        console.log(this.state.records);
      })
      .catch(err => {
        console.log(err);
      });
  }

  upvotebutton = recordid => {
    const url = "http://localhost:5000/idea/upvote/" + recordid;
    fetch(url)
      .then(res => {
        return res.json();
      })
      .then(resdata => {
        var { record } = resdata;
        var { id } = record;
        this.state.redords.forEach(record => {
          if (record.id === id) {
            record.id = id;
            console.log(record.id);
          }
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

    const ideas = this.state.records.map(record => {
      return <Ideaforms
        problem={record.data.Problem}
        upvote={record.data.upvote}
      />
    });

    return (
      <Aux>
        <div id="classicformpage">
          <MDBView>
            <MDBMask className="d-flex justify-content-center align-items-center gradient">
              <MDBContainer>
                <MDBRow>

                  <MDBAnimation
                    type="fadeInLeft"
                    delay=".3s"
                    className="white-text text-center text-md-left col-md-6 mt-xl-5 mb-5"
                  >
                    <h1 className="h1-responsive font-weight-bold">
                      Welcome To Request For Startups
                  </h1>
                    <hr className="hr-light" />
                    <h6 className="mb-4">
                      "Bad shit is coming. It always is in a startup. The odds of getting from launch to liquidity without some kind of disaster happening are one in a thousand. So don't get demoralized."--Paul Graham, co-founder of Y Combinator
                  <br />
                      <br />
                      <br />
                      Please Sign-Up to Add Your startup Idea
                  </h6>

                  </MDBAnimation>
                </MDBRow>
              </MDBContainer>
            </MDBMask>
          </MDBView>
        </div>
        <div id="text">
        <h1>This is where we provide the solution to every problem </h1>
       </div>
       <div id="words">
        <h2 id="question">Got a startup idea?</h2>
        <p id="answer">Click the Add Idea Button above and post your startup Idea also get some listen to solutions that other users have to offer</p>
        </div>
        {ideas}
        <Pagination  />
       </Aux>
    );
  }
}


export default Welcome;


//postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} //