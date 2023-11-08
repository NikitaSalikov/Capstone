import React, { useState } from 'react';
import './UserLogin.css'; 
import logo from '../pictures/logo.png';
import background from '../pictures/Buildings.png';

function UserLogin() {
    
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMeCheckbox, setRememberMeCheckbox] = useState(false);

    const handlingData = (event) => {
        event.preventDefault();
       
        console.log(username, password, rememberMeCheckbox);
    };

    return (
        <div className="userLogin" style={{ background: `url(${background})` }}>
            <div className="loginCard">
                <img src={logo} alt="Logo" className="logo" />
                
                <h3>Hello User!</h3>
                <h2>Log In to Your Account</h2>
            
                <form onSubmit={handlingData}>
                    <input 
                        type="username" 
                        placeholder="Enter your username"
                        value={username}
                        onChange={event => setUsername(event.target.value)}
                    />
                    <input 
                        type="password" 
                        placeholder="Enter your password"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                    
                    
                    <div className="RememberMe">     
                        <input 
                            type="checkbox" 
                            checked={rememberMeCheckbox}
                            onChange={event => setRememberMeCheckbox(event.target.checked)}
                        />
                        <label>Remember me</label>
                        <span className="forgotPassword">Forgot password?</span>
                    </div>
                    <button type="submit" className="loginButton">Log in</button>
                </form>
                <span className="New regiester">Don't have an account? <a href="/signupChoice">Sign up</a></span>
            </div>
        </div>
    );
}

export default UserLogin;
