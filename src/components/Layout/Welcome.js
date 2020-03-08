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


const jwt = require('jsonwebtoken');
var decodedtoken, upvotecolor = 'rgba(3, 3, 3, 0.3)';
const mainurl = require('../../links');

var recordlist = [];

class Welcome extends Component {
  state = {
    collapseID: "",
    records: [],
    link: '',
    redirect: false,
    id: '',
    loggedin: false
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

    const token = Cookies.get('jwttoken');
    try {
      decodedtoken = jwt.verify(token, 'heyphil123');
    } catch (err) {
      this.setState({ loggedin: false });
    }
    if (!decodedtoken) {
      this.setState({ loggedin: false });
    } else {
      this.setState({ loggedin: true });
    }

  }


  getfilteredideas(domain) {
    console.log(domain);
    if (domain === "ALL") {
      const ideasurl = mainurl + '/';
      console.log(domain);
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

    } else {
      fetch(mainurl + '/idea/filterideas/' + domain)
        .then(res => {
          return res.json();
        })
        .then(resdata => {
          this.setState({ records: resdata.recordlist });
          //console.log(resjson);
        })
        .catch(err => {
          console.log(err);
        });

    }

  }

  orderideas(type) {
    fetch(mainurl + '/idea/orderideas/' + type)
      .then(res => {
        return res.json();
      })
      .then(resdata => {
        this.setState({ records: resdata.recordlist });
        console.log(resdata);
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
      formdate.append('userid', decodedtoken.record_id);
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
      if (!this.state.loggedin) {
        return <Ideaforms
          name={record.data.userlu || record.data.screen_name}
          problem={record.data.Problem}
          upvote={record.data.upvote}
          onUpvote={this.upvotebuttonHandler.bind(this, record.id)}
          onComment={this.onComment.bind(this, record.id)}
          pic={record.data.Piclu}
        />
      } else {
        if (record.data.whoupvotelu && record.data.whoupvotelu.includes(decodedtoken.user.user_id)) {
          var upvotecolor = 'rgba(244, 3, 3, 0.3)';
        }
        return <Ideaforms
          name={record.data.userlu || record.data.screen_name}
          problem={record.data.Problem}
          upvote={record.data.upvote}
          onUpvote={this.upvotebuttonHandler.bind(this, record.id)}
          onComment={this.onComment.bind(this, record.id)}
          pic={record.data.Piclu}
          upvotecolor={upvotecolor}
        />
      }
    });

    return (
      <Aux>
        <div className={classes.main}>
          {this.renderRedirect()}
          <div className={classes.container}>
            <ul className={classes.ul}>
              <li className={classes.li}><a className={classes.links} onClick={this.orderideas.bind(this, 'NEWEST')}> #NEWEST </a></li>
              <li className={classes.li}><a className={classes.links} onClick={this.orderideas.bind(this, 'TRENDING')}> #TRENDING </a></li>
              <li className={classes.li}><a className={classes.links} onClick={this.orderideas.bind(this, 'TOP')}> #TOP </a></li>
            </ul>
          </div>
          {ideas}
          <div className={classes.side}>
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
              <div className={classes.innerBox2}>
              
              </div>
            </div>
            </div>
        </div>

      </Aux>

    );
  }
}


export default Welcome;



//postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} //