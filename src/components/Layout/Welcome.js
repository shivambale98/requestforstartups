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
import MenuIcon from '@material-ui/icons/Menu';
import { Modal, ModalBody, ModalHeader } from "shards-react";
import Navigator from './Navigator.js';
import { TableCell } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const jwt = require('jsonwebtoken');
var decodedtoken, upvotecolor;
const mainurl = require('../../links');

var recordlist = [];

class Welcome extends Component {
  state = {
    collapseID: "",
    records: [],
    link: '',
    redirect: false,
    id: '',
    loggedin: false,
    showupvotemodel: false,
    addideamodel: false,
    addidearedirect: false
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
    var path = window.location.href;
    var dom = path.split('ideas/')[1];
    if (dom) {
      this.getfilteredideas(dom);
    } else {
      this.getallideas();
    }
  }

  getallideas = () => {
    const ideasurl = mainurl + '/';
    fetch(ideasurl)
      .then(res => {
        return res.json();
      })
      .then(resdata => {
        console.log(resdata);
        this.setState({ records: resdata.ideas });
      })
      .catch(err => {
        console.log(err);
      });

    if (!this.props.user) {
      this.setState({ loggedin: false });
    } else {
      this.setState({ loggedin: true });
    }
  }


  getfilteredideas(domain) {
    console.log(domain);
    if (domain === "ALL") {
      this.getallideas();
    } else {
      fetch(mainurl + '/idea/filterideas/' + domain)
        .then(res => {
          return res.json();
        })
        .then(resdata => {
          this.setState({ records: resdata.ideas });
          //console.log(resjson);
        })
        .catch(err => {
          console.log(err);
        });

    }

  }

  setideas = (ideas) => {
    this.setState({ records: ideas });
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={'/comments/' + this.state.id} />
    }
  }

  upvotebuttonHandler = (recordid, index) => {
    var user;
    if (this.props.user) {
      var user = this.props.user.user;
    }
    if (this.props.user) {
      var formdate = new FormData();
      formdate.append('userid', this.props.user.record_id);
      const url = mainurl + "/idea/upvote/" + recordid;
      fetch(url, {
        method: 'POST',
        body: formdate
      })
        .then(res => {
          return res.json();
        })
        .then(resdata => {
          if (resdata.idea.upvote > this.state.records[index].upvote) {
            var psudoupvoters = [{ id: this.props.user.record_id }];
          } else {
            var psudoupvoters = [{ id: 0 }];
          }
          var psudouser = this.state.records[index].user;
          resdata.idea.user = psudouser;
          resdata.idea.Upvoters = psudoupvoters;
          this.state.records[index] = resdata.idea;
          this.setState({ records: this.state.records });
        })
        .catch(err => {
          console.log(err);
        });

    } else {
      this.setState({ showupvotemodel: !this.state.showupvotemodel });
    }

  }

  addideahandler() {
    if (this.props.user) {
      this.setState({ addidearedirect: true });
    } else {
      this.setState({ addideamodel: !this.state.addideamodel });
    }

  }

  addidearedirecthandler = () => {
    if (this.state.addidearedirect) {
      return <Redirect to={'/addidea'} />
    }
  }

  onComment = (id) => {
    this.setState({
      id: id,
      redirect: true
    });
    //this.props.history.push();
  }


  userprofile = () => {
    if (this.props.user) {
      return <div className={classes.innerBox2}>
        <h5 className={classes.heading}>Profile</h5>
        <div >
          <h5 className={classes.heading2}>User:</h5>
          <img className={classes.img}
            src={this.props.user.user.profile_image_url}
            alt="image"
            width={30}
            height={30}
          />
        </div>
        <p className={classes.heading1}>{this.props.user.user.screen_name}: loggedin</p>
      </div>

    }
  };

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
      upvotecolor = undefined;
      if (!this.state.loggedin) {
        return <Ideaforms
          name={record.user.name}
          problem={record.problem}
          upvote={record.upvote}
          onUpvote={this.upvotebuttonHandler.bind(this, record.id, index)}
          onComment={this.onComment.bind(this, record.id)}
          pic={record.user.profilePicture}
        />
      } else {
        if (record.Upvoters) {
          record.Upvoters.forEach(voter => {
            if (voter.id === this.props.user.record_id) {
              upvotecolor = '#ffff00';
            }
          });
          //console.log(upvotecolor);
        }
        return <Ideaforms
          name={record.user.name}
          problem={record.problem}
          upvote={record.upvote}
          onUpvote={this.upvotebuttonHandler.bind(this, record.id, index)}
          onComment={this.onComment.bind(this, record.id)}
          pic={record.user.profilePicture}
          upvotecolor={upvotecolor}
        />
      }
    });

    return (
      <Aux>
        <div className={classes.main}>
          <Navigator setideas={this.setideas} user={this.props.user} />

          {this.renderRedirect()}
          <Modal open={this.state.showupvotemodel} toggle={this.upvotebuttonHandler.bind(this)}>
            <ModalHeader>Login Error</ModalHeader>
            <ModalBody>👋 Hello there, looks like your not logged in</ModalBody>
            <ModalBody><Link className={classes.liks} to='/login'><b>login</b></Link> to upvote</ModalBody>
          </Modal>
          <Modal open={this.state.addideamodel} toggle={this.addideahandler.bind(this)}>
            <ModalHeader>Login Error</ModalHeader>
            <ModalBody>👋 Hello there, looks like your not logged in</ModalBody>
            <ModalBody><Link className={classes.liks} to='/login'><b>login</b></Link> to addIdea</ModalBody>
          </Modal>
          {this.addidearedirecthandler()}
          <div className={classes.ideacard}>
            {ideas}
            <div className={classes.buts}>
              <Fab color="primary" aria-label="add"
                onClick={this.addideahandler.bind(this)}
              >
                <AddIcon />
              </Fab>
            </div>
            <TableCell className={classes.side}>
              <div>
                <div className={classes.plane}>
                  <div className={classes.innerBox}>
                    <a className={classes.fields} onClick={this.getfilteredideas.bind(this, "ALL")} >#ALL</a> <br />
                    <a className={classes.fields} onClick={this.getfilteredideas.bind(this, "Web-Mobile Development")} >#Web/mobile Dev</a> <br />
                    <a className={classes.fields} onClick={this.getfilteredideas.bind(this, "Blockchain-Crypto")} >#blockchain/crypto</a>  <br />
                    <a className={classes.fields} onClick={this.getfilteredideas.bind(this, "Hardware-Elctronics")} >#Elctronics</a>  <br />
                    <a className={classes.fields} onClick={this.getfilteredideas.bind(this, "Social")} >#Social</a><br />
                    <a className={classes.fields} onClick={this.getfilteredideas.bind(this, "Gaame Development")} >#Game-Dev</a> <br />
                    <a className={classes.fields} onClick={this.getfilteredideas.bind(this, "AI-ML")} >#AI/ML</a>
                    <a className={classes.fields} onClick={this.getfilteredideas.bind(this, "IOT")} >#IOT</a>
                  </div>
                  <div>
                  </div>
                  {this.userprofile()}
                </div>
              </div>
            </TableCell>
          </div>
        </div>
      </Aux>

    );
  }

}


export default Welcome;
