import React, { Component } from 'react';
import './Welcome.css';
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
import Pagination from './Pagination';


import Cookies from 'js-cookie';
const jwt = require('jsonwebtoken');

const mainurl = 'https://gentle-retreat-77560.herokuapp.com';
//const mainurl = 'http://localhost:5000';//
var recordlist = [];

class Welcome extends Component {
  state = {
    collapseID: "",
    records: [],
    link: '',
    redirect: false,
    id: ''
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
    const ideasurl = mainurl + '/';
    fetch(ideasurl)
      .then(res => {
        return res.json();
      })
      .then(resdata => {
        console.log(resdata);
        this.setState({ records: resdata.recordlist });
      })
      .catch(err => {
        console.log(err);
      });

  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={'/comments/' + this.state.id} />
    }
  }

  upvotebuttonHandler = recordid => {
    const token = Cookies.get('jwttoken');
    var decodedtoken;
    try {
      decodedtoken = jwt.verify(token, process.env.secret);
    } catch (err) {
      console.log(err);
    }
    if (decodedtoken) {
      this.setState({
        loggedin: true
      });
    } else {
      this.setState({
        loggedin: false
      });
    }
    if (this.state.loggedin) {
      var formdate = new FormData();
      formdate.append('userid', decodedtoken.userid);
      if (this.state.loggedin) {
        const url = mainurl + "/idea/upvote/" + recordid;
        fetch(url, {
          method: 'POST',
          body: formdate
        })
          .then(res => {
            return res.json();
          })
          .then(resdata => {
            var { record } = resdata;
            var { id } = record;
            var { link } = resdata;
            console.log(resdata);
            var temp = [];
            this.state.records.map(recordt => {
              if (recordt.id === id) {
                var temprecord = recordt;
                recordt = record;
                recordt.email = temprecord.email;
                temp.push(recordt);
              } else {
                temp.push(recordt);
              }
            });
            console.log(temp);

            this.setState({ records: temp });
            this.setState({ link: link });
          })
          .catch(err => {
            console.log(err);
          });

      }
    }
  }

  onComment = (id) => {
    this.setState({
      id: id,
      redirect: true
    });
    //this.props.history.push();
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
        email={record.data.userlu || record.data.screen_name}
        problem={record.data.Problem}
        upvote={record.data.upvote}
        onUpvote={this.upvotebuttonHandler.bind(this, record.id)}
        onComment={this.onComment.bind(this, record.id)}
      />
    });

    return (
      <Aux>
        {this.renderRedirect()}
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
          <h2>This is where we provide the solution to every problem </h2>
        </div>
        <aside id="words">
          <h2 id="question">Got a startup idea?</h2>
          <p id="answer">Click the Add Idea Button above and post your startup Idea also  listen to solutions that other users have to offer in the comments section.</p>
          <h2 id="question1">wanna Tweet your idea?</h2>
          <p id="answers"><a href="#" id="link"><u><b>Tweet it</b></u></a> and include #rfs_india
        <br />Upvote if you find the best of the
        <br />solution to your problem.
        <br />help developers
        <br />create better products.
        <br />
            <br />
            <br />
            <br />Made by <a href="#" id="link"><u><b>Rohit Martires</b></u></a> and
        <br /><a href="#" id="link"><u><b>Shivam Bale</b></u></a> under the
        <br /> guidance of <a href="#" id="link"><u><b>Nova Semita.</b></u></a>
            <br /> Follow us on Twitter to
        <br />see other things we do.
        </p>
        </aside>
        {ideas}
        <Pagination />
      </Aux>
    );
  }
}


export default Welcome;


//postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} //