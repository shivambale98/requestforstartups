import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import classes from './Comment.module.css'
import Aux from '../../hoc/Auxiliary';
import Comments from './Comments'

import Cookies from 'js-cookie';
const jwt = require('jsonwebtoken');


const mainurl = 'https://gentle-retreat-77560.herokuapp.com';
//const mainurl = 'http://localhost:5000';//

class Comment extends Component {
  state = {
    collapseID: "",
    records: [],
    comments: [],
    users: [],
    ideaid: undefined,
    commentbox: '',
    email: ''
  };
  //constructor() {
  //  super();
  //this.state = {
  //placeholder:'you are replying to ...'
  //};
  //    }


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
        this.setState({
          comments: resdata.comments || [],
          users: resdata.users || []
        });
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


  render() {

    const comments = this.state.comments.map((comment, index) => {
      return <Comments
        name={this.state.users[index]}
        comment={comment}
      />
    });
    return (
      <Aux>
        <h3 className={classes.lab}>Comments</h3>
        <MDBContainer>
          <MDBRow>
            <MDBCol md="8">
              <div class="form-group">
                <textarea class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="6"
                  name="comment"
                  placeholder="you are replying to.."
                  onChange={this.handelchange}
                  value={this.state.commentbox}
                >
                </textarea>
                <button onClick={this.postComment}>post</button>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        {comments}
      </Aux>
    )
  }
};


export default Comment;
