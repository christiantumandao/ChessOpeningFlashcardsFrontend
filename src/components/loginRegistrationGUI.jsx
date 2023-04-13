import React, { useState } from 'react';
import axios from 'axios';
function LoginRegistrationGUI(props) {

        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");

        const handleUsernameChange = (e) => {
            setUsername(e.target.value);
        }

        const handlePasswordChange =(e) => {
            setPassword(e.target.value);
        }

        const handleSubmit = (e) => {
            e.preventDefault();
            axios.get("http://localhost:5000/api/users/all-users")
            .then( response => {
                let res = response.data;
                let validLogin=false;
                let foundUser = undefined;
                res.forEach(currUser => {
                    if (currUser.username === username && currUser.password === password) {
                        validLogin=true;
                        foundUser = currUser;
                    }
                })
                if (validLogin===true) {
                    props.handleLoginSubmit(foundUser);
                }
                else alert("Login failed");
            })
            .catch(error => console.error(error));
        }


        return (
            <React.Fragment>
                <div className="login-title">
                    <div>Don't have an account? Register:</div>
                    <button onClick={ ()=>props.handleRegister() }>Register</button>
                </div>
                <form 
                    className="login-registration-gui-form"
                    onSubmit={ handleSubmit }>
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={handleUsernameChange}
                        placeholder="Username"
                    />
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="Password"
                    />
                    <button type="submit">Login</button>
                </form>
            </React.Fragment>
        );

}
 
export default LoginRegistrationGUI;