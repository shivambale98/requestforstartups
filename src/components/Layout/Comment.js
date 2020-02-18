import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import classes from './Comment.module.css'
import Aux from '../../hoc/Auxiliary';
import Comments from './Comments'
import { MDBInput } from 'mdbreact';
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

    const comments = this.state.comments.map((comment, index) => {
      return <Comments
        name={this.state.users[index]}
        comment={comment}
      />
    });
    return (
      <Aux>
        <h2 className={classes.lab}>Comments</h2>
        <div className={classes.container}>
        <MDBCol md="12">
            <MDBRow>
                <MDBContainer>
                    <div>
                        <p className={classes.title}><u>this is the problem</u></p>
                    </div>
                </MDBContainer>
            </MDBRow>
        </MDBCol>
    </div>
       <MDBContainer>
          <MDBRow>
            <MDBCol md="6">
              <div class="form-group">
                <p className={classes.head}>you are replying to {this.props.email}</p>
              <MDBInput 
                  type="textarea" 
                  rows="5"
                  id="exampleFormControlTextarea1"  
                  name="comment"
                  onChange={this.handelchange}
                  value={this.state.commentbox}
                  background="primary"
                  placeholder="write your comment"
                />
                <button className={classes.btn} onClick={this.postComment}><b>post</b></button>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <br />
        <br />
        <br />
        <br />     
        {comments}
      </Aux>
    )
  }
};


export default Comment;






