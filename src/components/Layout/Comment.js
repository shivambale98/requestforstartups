import React, { Component } from 'react';
import classes from './Comment.module.css'
import Aux from '../../hoc/Auxiliary';
import Cookies from 'js-cookie';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { Link } from 'react-router-dom';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter, FormTextarea } from "shards-react";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AddCommentIcon from '@material-ui/icons/AddComment';
import AddComment from './Addcomment';
import Paper from '@material-ui/core/Paper';
import Commentbox from './commentbox';
import Container from '@material-ui/core/Container';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';


const jwt = require('jsonwebtoken');
const mainurl = require('../../links');
var upvotecolor = 'rgba(3, 3, 3, 0.3)';


class Comment extends Component {
  state = {
    collapseID: "",
    records: [],
    comments: [],
    users: [],
    ideaid: undefined,
    commentbox: '',
    email: '',
    Problem: undefined,
    userlu: undefined,
    addcomment: false,
    open: false,
    commmentmodel: false,
    showupvotemodel: false
  };

  postHandler = () => {
    this.setState({ addcomment: true });
  }

  componentDidMount() {
    this.getcomments();
  }

  getcomments = () => {
    var id = window.location.href;
    id = id.split('/comments/')[1];
    this.setState({
      ideaid: id
    });

    fetch(mainurl + '/comments/' + id)
      .then(res => {
        return res.json();
      })
      .then(resdata => {
        this.setState({
          comments: resdata.comments || [],
          problem: resdata.idea.problem,
          username: resdata.user.name,
          upvote: resdata.idea.upvote,
          profilePicture: resdata.user.profilePicture
        });
        console.log(resdata);
      })
      .catch(err => {
        console.log(err);
      });

  }

  handelchange = (event) => {
    this.setState({
      commentbox: event.target.value
    });
  }

  clickmodel = () => {
    const token = Cookies.get('jwttoken');
    var decodedtoken;
    try {
      decodedtoken = jwt.verify(token, 'heyphil123');
    } catch (err) {
      console.log(err);
    }
    if (decodedtoken) {
      this.setState({ open: !this.state.open });
    } else {
      this.togcommentmodel();
    }
  }

  togcommentmodel = () => {
    this.setState({ commmentmodel: !this.state.commmentmodel });
  }

  postComment = () => {
    //console.log(this.state.commentbox);
    this.clickmodel();
    if (this.props.user) {
      var user = this.props.user.user;
      this.state.name = user.screen_name;
      const ideaid = this.state.ideaid;
      var formdata = new FormData();
      formdata.append('comment', this.state.commentbox);
      formdata.append('userid', this.props.user.record_id);

      fetch(mainurl + '/comments/' + ideaid, {
        method: 'POST',
        body: formdata,
      })
        .then(res => {
          return res.json();
        })
        .then(resdata => {
          fetch(mainurl + '/comments/' + this.state.ideaid)
            .then(res => {
              return res.json();
            })
            .then(resdata => {
              this.setState({ comments: resdata.comments });
            })
            .catch(err => {
              console.log(err);
            });

        })
        .catch(err => {
          console.log(err);
        });
    }

  }


  upvotebuttonHandler = () => {
    var user;
    if (this.props.user) {
      var user = this.props.user.user;

      var formdate = new FormData();
      formdate.append('userid', this.props.user.record_id);
      const url = mainurl + "/comments/upvote/" + this.state.ideaid;
      fetch(url, {
        method: 'POST',
        body: formdate
      })
        .then(res => {
          return res.json();
        })
        .then(resdata => {
          this.setState({ upvote: resdata.idea.upvote });
        })
        .catch(err => {
          console.log(err);
        });

    } else {
      this.setState({ showupvotemodel: !this.state.showupvotemodel });
    }
  }

  checkifupvote = () => {
    if (this.state.loggedin) {
      if (this.state.whoupvotelu.includes(this.state.decodedtoken.user_id)) {
        upvotecolor = 'rgba(244, 3, 3, 0.3)';
      }
    }
  };


  userprofile = () => {
    if (this.props.user) {
      return <div className={classes.innerBox2}>
        <h5 className={classes.heading}>Profile</h5>
        <div >
        <h5 className={classes.heading2}>User:</h5>
          <img className={classes.img23}
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



  render() {
    //console.log(this.state.users);
    this.checkifupvote();

    const comments = this.state.comments.map((comment, index) => {
      return <Commentbox
        userimage={comment.Commenters.profilePicture}
        username={comment.Commenters.name}
        usercomment={comment.commentText}
      />
    });

    return (
      <Aux>

        <div className={classes.main}>
          <div className={classes.containers}>
            <ul className={classes.ul}>
              <li className={classes.li}><Link to='/' className={classes.links}><ArrowBackIcon style={{ fontSize: 40 }} />  BACK </Link></li>
            </ul>
          </div>
          <div className={classes.righttoolbar}>
            <div className={classes.parent}>
              <div >
                <img className={classes.img}
                  src={this.state.profilePicture}
                  alt="image"
                  width={70}
                  height={70}
                />
              </div>
              <Container maxWidth="lg">
                <div className={classes.container}>
                  <Paper elevation={0.5}>
                    <p className={classes.head}>@{this.state.username}</p>
                    <p className={classes.title}>{this.state.problem}</p>
                  </Paper>
                </div>
              </ Container>
              <div className={classes.buttn}>
                  <button className={classes.btn} onClick={this.upvotebuttonHandler.bind(this)} >
                  <div className={classes.icon}>
                  < ArrowDropUpIcon/>
                  <p className={classes.vote}>
                    {this.state.upvote}  
                    </p>
                    </div> 
                    </button>
                </div>
              <div className={classes.ThumbsUp}>
                <Link
                  onClick={this.clickmodel}
                  className={classes.titles}>
                  <AddCommentIcon style={{ fontSize: 40 }} />
                </Link>
              </div>
              <div>
                <Modal open={this.state.open} toggle={this.clickmodel}>
                  <ModalHeader>Post your comment</ModalHeader>
                  <ModalBody>
                    <FormTextarea size="lg" onChange={this.handelchange.bind(this)} />
                    <Button onClick={this.postComment}>Post</Button>
                  </ModalBody>
                </Modal>
              </div>

              <div>
                <Modal open={this.state.commmentmodel} toggle={this.togcommentmodel}>
                  <ModalHeader>Login Error</ModalHeader>
                  <ModalBody>👋 Hello there, looks like your not logged in</ModalBody>
                  <ModalBody><Link to='/login'>login</Link> to comment</ModalBody>
                </Modal>
              </div>

              <Modal open={this.state.showupvotemodel} toggle={this.upvotebuttonHandler.bind(this)}>
                <ModalHeader>Login Error</ModalHeader>
                <ModalBody>👋 Hello there, looks like your not logged in</ModalBody>
                <ModalBody><Link to='/login'>login</Link> to upvote</ModalBody>
              </Modal>

            </div>

            {comments}
            <div className={classes.side}>
              <div className={classes.plane}>
                <div className={classes.innerBox}>
                  <a className={classes.fields} ><Link className={classes.fields} to='/ideas/ALL'>#ALL</Link></a> <br />
                  <a className={classes.fields} ><Link className={classes.fields} to='/ideas/Web-Mobile Development'>#Web/mobile Dev</Link></a> <br />
                  <a className={classes.fields} ><Link className={classes.fields} to='/ideas/Blockchain-Crypto'>#Blockchain/crypto</Link></a>  <br />
                  <a className={classes.fields} ><Link className={classes.fields} to='/ideas/Hardware-Elctronics'>#Hardware/Elctronics</Link></a>  <br />
                  <a className={classes.fields} ><Link className={classes.fields} to='/ideas/Social'>#Social</Link></a><br />
                  <a className={classes.fields} ><Link className={classes.fields} to='/ideas/Gaame Development'>#Game-Dev</Link></a><br />
                  <a className={classes.fields} ><Link className={classes.fields} to='/ideas/AI-ML'>#AI-ML</Link></a>
                  <a className={classes.fields} ><Link className={classes.fields} to='/ideas/IOT'>#IOT</Link></a>
                </div>
                {this.userprofile()}
              </div>
            </div>

          </div>
        </div>

      </Aux>
    )
  }
};


export default Comment;