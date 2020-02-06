import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdbreact';
//import Cookies from 'universal-cookie';
import Cookies from 'js-cookie';

class Addidea extends Component {
  state = {
    token: ''
  };

  componentDidMount() {
    const token = Cookies.get('jwttoken');
    this.setState({ token: token });
  }

  render() {
    return (
      <div>
        <MDBContainer>
          <MDBRow>
            <MDBCol md="12">
              <form action='http://localhost:5000/addidea' method='POST'>
                <p class="h4 mb-4">Startup Idea</p>
                <p class="h6 mb-6">Tell us about your idea</p><br /><br />
                <label>Select the domain of your startup</label>
                <select class="browser-default custom-select mb-4" name='domain' required>
                  <option value="" disabled selected hidden>Select domain</option>
                  <option value="AI/ML" >AI/ML</option>
                  <option value="IOT">IOT</option>
                  <option value="Web/Mobile Development">Web/Mobile Development</option>
                  <option value="Blockchain/Crypto">Blockchain/Crypto</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Social">Social</option>
                  <option value="Game Development">Game Development</option>
                </select>

                <div class="form-group">
                  <input type='text' name="name" class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Name"></input>
                </div>

                <div class="form-group">
                  <textarea name="problem" class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Problem"></textarea>
                </div>

                <div class="form-group">
                  <textarea name="solution" class="form-control" id="exampleFormControlTextarea2" rows="3" placeholder="Solution"></textarea>
                </div>

                <input type='hidden' name='jwttoken' value={this.state.token}></input>

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