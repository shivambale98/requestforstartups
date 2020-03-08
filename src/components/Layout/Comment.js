import React, { Component } from 'react';
import classes from './Comment.module.css'
import Aux from '../../hoc/Auxiliary';
import Cookies from 'js-cookie';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AddCommentIcon from '@material-ui/icons/AddComment';
import AddComment from './Addcomment';
import Commentbox from './commentbox';
const jwt = require('jsonwebtoken');
const mainurl = require('../../links');

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
    addcomment: false
  };

  postHandler = () => {
    this.setState({ addcomment: true });
  }

  componentDidMount() {
    var id = this.props.location.pathname.toString();
    id = id.split('/')[2];
    this.setState({
      ideaid: id
    });

    fetch(mainurl + '/comments/' + id)
      .then(res => {
        return res.json();
      })
      .then(resdata => {
        var { Problem } = resdata.fields;
        var { userlu } = resdata.fields;
        var { screen_name } = resdata.fields;
        var { Piclu } = resdata.fields;
        this.setState({
          comments: resdata.comments || [],
          users: resdata.users || [],
          Problem: Problem,
          userlu: userlu || screen_name,
          userpic: Piclu || [],
          userspic: resdata.userspic || []
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

  postComment = () => {
    const token = Cookies.get('jwttoken');
    var decodedtoken;
    try {
      decodedtoken = jwt.verify(token, 'heyphil123');
    } catch (err) {
      console.log(err);
    }
    if (decodedtoken) {
      this.state.email = decodedtoken.email;
      const ideaid = this.state.ideaid;
      var formdata = new FormData();
      formdata.append('comment', this.state.commentbox);
      formdata.append('email', this.state.email);

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
              this.setState({
                comments: resdata.comments || [],
                users: resdata.users || [],
                commentbox: ''
              });
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


  render() {
    console.log(this.state.users);

    const comments = this.state.comments.map((comment, index) => {
      return <Commentbox
        userimage={this.state.userspic[index]}
        username={this.state.users[index]}
        usercomment={comment}
      />
    });

    return (
      <Aux>
        <div className={classes.main}>
          <div className={classes.containers}>
            <ul className={classes.ul}>
              <li className={classes.li}><Link className={classes.links}><ArrowBackIcon style={{ fontSize: 40 }} />  BACK </Link></li>
            </ul>
          </div>
          <div className={classes.righttoolbar}>
            <div className={classes.parent}>
              <div >
                <img className={classes.img}
                  src={this.state.userpic}
                  alt="image"
                  width={70}
                  height={70}
                />
              </div>
              <div className={classes.container}>
                <p className={classes.head}>@{this.state.userlu}</p>
                <p className={classes.title}>{this.state.Problem}</p>

              </div>
              <div className={classes.ThumbsUp}>
                <p className={classes.votes}> 31 <ThumbUpIcon style={{ fontSize: 23 }} />  </p>
                <Link
                  onClick={classes.posted}
                  className={classes.titles}>
                  <AddCommentIcon style={{ fontSize: 30 }} />
                </Link>
              </div>
            </div>

            <AddComment
              show={this.state.addcomment} >

            </AddComment>
            {comments}
            <div className={classes.side}>
              <div className={classes.plane}>
                <div className={classes.innerBox}>
                  <a className={classes.fields} href="#">#Web/mobile Dev</a> <br />
                  <a className={classes.fields} href="#">#blockchain/crypto</a>  <br />
                  <a className={classes.fields} href="#">#Elctronics</a>  <br />
                  <a className={classes.fields} href="#">#Social</a>
                  <a className={classes.fields} href="#">#Game-Dev</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Aux>
    )
  }
};


export default Comment;