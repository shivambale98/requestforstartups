import React, { Component} from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdbreact';
import classes from './Addidea.module.css';



class Addidea extends  Component {
render () {
    return (
<div className={classes.idea}>        
<MDBContainer>
  <MDBRow>
    <MDBCol md="12">
        <form>
            <h3 className={classes.head}>Startup Idea</h3>
            <h5 className={classes.para}>Tell us about your idea</h5><br /><br />
            <label className={classes.lab}>Select the domain of your startup</label>
            <select class="browser-default custom-select mb-4">
               <option value="" selected>Select domain</option>
               <option value="1" >AI/ML</option>
               <option value="2">IOT</option>
               <option value="3">Web/Mobile Development</option>
               <option value="4">Blockchain/Crypto</option>
               <option value="5">Electronics</option>
               <option value="6">Social</option>
               <option value="7">Game Development</option>
            </select>
           <label className={classes.lab}>Add your problem statement here!</label>
        <div class="form-group">
           <textarea class="form-control" id="exampleFormControlTextarea1" rows="6" placeholder="Problem"></textarea>
        </div>
   
    
        <div className="text-center mt-4">
                  <MDBBtn color="primary" outline type="submit">
                    Submit
                    <MDBIcon far icon="paper-plane" className="ml-2" />
                  </MDBBtn>
        </div>
    </form>
    </MDBCol>
  </MDBRow>
</MDBContainer>
</div>
    )
}

};


export default Addidea;