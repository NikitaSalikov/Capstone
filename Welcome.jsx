import React from 'react';
import './Welcome.css';
import logo from '../pictures/logo.png';
import Buildings from '../pictures/Buildings.png';
import { Link } from 'react-router-dom';

function Welcome() {
    return (
        <div className="welcome-container">
            <div className="header">
                <img src={logo} alt="Logo" className="logo" />
                <h1> Welcome to Views.live chat! </h1>
            </div>

            <div className="button-group">
            {  /* when the user clicks on business button */}
                <Link to="/businesslogin-page">
                    <button className="businessbutton">Business</button>
                </Link>
              {  /* when the user clicks on user button */}
                <Link to="/userlogin-page"> 
                    <button className="userbutton">User</button>
                </Link>
            </div>

            <img src={Buildings} alt="Buildings" className="buildings- image" />
        </div>
    );
}

export default Welcome;
