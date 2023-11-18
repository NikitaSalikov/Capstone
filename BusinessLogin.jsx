import React, { useState } from 'react';
import './BusinessLogin.css';
import logo from '../pictures/logo.png'; 
import background from '../pictures/Buildings.png'; 
import { useNavigate } from 'react-router-dom';  // Updated import

function BusinessLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMeCheckbox, setRememberMeCheckbox] = useState(false);

    const navigate = useNavigate();  // Updated hook

    const handlingData = (event) => {
        event.preventDefault();
        // login logic
        console.log(username, password, rememberMeCheckbox);
        
        // After login logic, redirect to the Dashboard page
        navigate('/dashboard');  // Updated navigation call
    };



    return (
        <div className="businessLogin" style={{ background: `url(${background})` }}>
            <div className="loginCard">
                <img src={logo} alt="Logo" className="logo" />
                
                <h3> Hello Business</h3>
                <h2>Log In to Your Account</h2>
                
                <form onSubmit={handlingData}>
                    {/* To enter username */}
                    <input 
                        type="username" 
                        placeholder="Enter your username"
                        value={username}
                        onChange={event => setUsername(event.target.value)}
                    />
                    {/* To enter password */}
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

export default BusinessLogin;
