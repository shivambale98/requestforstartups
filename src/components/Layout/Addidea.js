import React, { Component} from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdbreact';

class Addidea extends  Component {
render () {
    return (
<div>        
<MDBContainer>
  <MDBRow>
    <MDBCol md="12">
        <form >
            <p class="h4 mb-4">Startup Idea</p>
            <p class="h6 mb-6">Tell us about your idea</p><br /><br />
            <label>Select the domain of your startup</label>
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
    
        <div class="form-group">
           <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Problem"></textarea>
        </div>
   
        <div class="form-group">
          <textarea class="form-control" id="exampleFormControlTextarea2" rows="3" placeholder="Solution"></textarea>
        </div>
   
    
        <div className="text-center mt-4">
                  <MDBBtn color="warning" outline type="submit">
                    Send
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