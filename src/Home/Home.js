import React, { Component } from 'react';
import './Home.css';

import logo from './../img/bandit-logo.png';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div id="welcome" className="container-fluid">
          <div className="row">
            <div className="col-sm-2">
              <img src={logo} alt="logo" />
            </div>
            <div className="col-sm">
              <h1>Welcome to BANDit!</h1>
              <h4>A progressive social platform for student musicians</h4>
            </div>
          </div>
          <div className="info row">
            <div className="col-sm">
              <h5>
                BANDit is your place to meet other musicians who share your
                tastes in music. <br />
                <button className="btn">Sign up!</button>
              </h5>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
