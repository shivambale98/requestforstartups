import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdbreact';
//import Cookies from 'universal-cookie';
import Cookies from 'js-cookie';
import classes from './Addidea.module.css';
import Aux from '../../hoc/Auxiliary';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Button } from 'react-bootstrap';



const mainurl = 'https://gentle-retreat-77560.herokuapp.com';
//const mainurl = 'http://localhost:5000';//

class Addidea extends Component {
  state = {
    token: ''
  };

  componentDidMount() {
    const token = Cookies.get('jwttoken');
    console.log(token);
    this.setState({ token: token });
  }

  render() {
    return (
      <Aux>
     
<div className={classes.main}>
<div className={classes.containers}>
     <ul className={classes.ul}>
     <li className={classes.li}><Link className={classes.links}><ArrowBackIcon style={{ fontSize:40 } } />  BACK </Link></li>
   </ul>
  </div>
        <div className={classes.form}>
        <MDBContainer>
          <MDBRow>
            <MDBCol md="12">
              <form action={mainurl + '/addidea'} method='POST'>
                <h3 className={classes.head}>Startup Idea</h3>
                <h5 className={classes.para}>Tell us about your idea</h5><br /><br />
                <label className={classes.lab}>Select the domain of your startup</label>
                <select class="browser-default custom-select mb-4" name='domain' required>
                  <option value="" disabled selected hidden>Select domain</option>
                  <option value="AI/ML" >AI/ML</option>
                  <option value="IOT">IOT</option>
                  <option value="Web/Mobile Development">Web/Mobile Development</option>
                  <option value="Blockchain/Crypto">Blockchain/Crypto</option>
                  <option value="Hardware/Electronics">Hardware/Electronics</option>
                  <option value="Social">Social</option>
                  <option value="Game Development">Game Development</option>
                </select>

                <label className={classes.lab}>Add your problem statement here!</label>
                <div class="form-group">
                  <textarea class="form-control" id="exampleFormControlTextarea1" rows="6" placeholder="Problem" name="problem"></textarea>
                </div>

                <input type='hidden' value={this.state.token} name='jwttoken' />

                <div className="text-center mt-4">
                  <Button variant="primary" outline type="submit">
                    Submit
                  </Button>
                </div>
              </form>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        </div>
        <div className={classes.side}>
         <div className={classes.innerBox}> 
    <div className={classes.plane}>
    <a className={classes.fields} href="#">#Web/mobile Dev</a> <br />
    <a className={classes.fields} href="#">#blockchain/crypto</a>  <br />
    <a className={classes.fields} href="#">#Elctronics</a>  <br />
    <a className={classes.fields} href="#">#Social</a>  
    <a className={classes.fields} href="#">#Game-Dev</a>  
    </div>
    </div>
  </div>   
      </div>
      </Aux>
    )
  }

};


export default Addidea;

