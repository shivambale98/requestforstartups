import React, { Component } from 'react';
import classes from './Welcome.module.css';
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import Ideaforms from './Ideaforms';
import Aux from '../../hoc/Auxiliary';
import Pagination from './Pagination';
import Cookies from 'js-cookie';
import { Col, Row, Container } from 'react-bootstrap';
import Menu from './Menu';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';



const jwt = require('jsonwebtoken');

const mainurl = require('../../links');

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
    var loggedin;
    try {
      decodedtoken = jwt.verify(token, 'heyphil123');
    } catch (err) {
      console.log(err);
    }
    if (decodedtoken) {
      this.setState({
        loggedin: true
      });
      loggedin = true;
    } else {
      this.setState({
        loggedin: false
      });
      loggedin = false;
    }

    if (loggedin) {
      var formdate = new FormData();
      formdate.append('userid', decodedtoken.userid);
      if (loggedin) {
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
            //console.log(resdata);
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
            //console.log(temp);

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

    console.log(this.state.records);
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
        <div className={classes.main}>
          {this.renderRedirect()}
          <div className={classes.container}>
            <ul className={classes.ul}>
              <li className={classes.li}><Link className={classes.links}>  #NEWEST </Link></li>
              <li className={classes.li}><Link className={classes.links}>  #TRENDING </Link></li>
              <li className={classes.li}><Link className={classes.links}> #TOP </Link></li>
            </ul>
          </div>
          {ideas}
          <div className={classes.side}>
            <div className={classes.plane}>
              <a className={classes.fields} href="#">#Web/mobile Dev</a> <br />
              <a className={classes.fields} href="#">#blockchain/crypto</a>  <br />
              <a className={classes.fields} href="#">#Elctronics</a>  <br />
              <a className={classes.fields} href="#">#Social</a>
              <a className={classes.fields} href="#">#Game-Dev</a>
            </div>
          </div>
        </div>

      </Aux>
    );
  }
}


export default Welcome;



//postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} //