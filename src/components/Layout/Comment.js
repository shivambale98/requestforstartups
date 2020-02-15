import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import classes from './Comment.module.css'
import Aux from '../../hoc/Auxiliary';
import Comments from './Comments'



 class Comment  extends Component{
  state = {
    collapseID: "",
    records: []
  };
    //constructor() {
      //  super();
        //this.state = {
          //placeholder:'you are replying to ...'
        //};
//    }
     render() {

      
    const Comments = this.state.records.map(record => {
      return <Comments
      
      />
    });
         return(
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
                        placeholder="you are replying to..">            
            </textarea>
            </div>
            </MDBCol>
          </MDBRow>
      </MDBContainer>
      {Comments}
  </Aux>
         )
     }
};


export default Comment;
