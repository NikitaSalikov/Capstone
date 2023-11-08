import React from 'react';
import './Dashboard.css';
import comImg from '../pictures/com.png';

function Dashboard() {
  return (
    <div>
    
      <div className="dashboard">
        <h1>Welcome Back!</h1>
     </div>

       <div className="communicationButton"> 
       
        <button className="communication-button">
         
          <div className="com-content">
            <span className="com-text">Communication Portal</span>
            <div className="com-image">
              <img src={comImg} alt="Communication Portal Image" />
            </div>
          </div>

        </button>


      </div>
    </div> 
  );
}

export default Dashboard;
