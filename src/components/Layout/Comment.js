import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import classes from './Comment.module.css'
import Aux from '../../hoc/Auxiliary';
import Comments from './Comments'
import Ideaforms from './Ideaforms';
import { MDBInput } from 'mdbreact';
import Cookies from 'js-cookie';
const jwt = require('jsonwebtoken');


//const mainurl = 'https://gentle-retreat-77560.herokuapp.com';
const mainurl = 'http://localhost:5000';//

class Comment extends Component {
  state = {
    collapseID: "",
    records: [],
    comments: [],
    users: [],
    ideaid: undefined,
    commentbox: '',
    email: '',
    idea: undefined
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
          users: resdata.users || [],
          idea: resdata.fields
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

  upvotebuttonHandler = recordid => {
    const token = Cookies.get('jwttoken');
    var decodedtoken;
    try {
      decodedtoken = jwt.verify(token, 'heyphil123');
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


  render() {
    console.log(this.state);

    const comments = this.state.comments.map((comment, index) => {
      return <Comments
        name={this.state.users[index]}
        comment={comment}
      />
    });

    const currentidea = () => {
      return <Ideaforms
        email={this.state.idea.userlu || this.state.idea.screen_name}
        problem={this.state.idea.Problem}
        upvote={this.state.idea.upvote}
        onUpvote={this.upvotebuttonHandler.bind(this, this.state.idea.id)}
        onComment={this.onComment.bind(this, this.state.idea.id)}
      />
    }

    return (
      <Aux>
        {currentidea}
        <h3 className={classes.lab}>Comments</h3>
        <MDBContainer>
          <MDBRow>
            <MDBCol md="6">
              <div class="form-group">
                <MDBInput
                  type="textarea"
                  rows="5"
                  id="exampleFormControlTextarea1"
                  name="comment"
                  onChange={this.handelchange}
                  value={this.state.commentbox}
                  background="primary"
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






