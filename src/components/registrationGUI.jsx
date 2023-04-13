import React, { useState } from 'react';
import axios from 'axios';

function RegistrationGUI({ handleRegistrationSubmit }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleFirstNameChange =(e)=>{
        setFirstName(e.target.value);
    }

    const handleLastNameChange =(e)=>{
        setLastName(e.target.value);
    }
    const handleUsernameChange =(e)=>{
        setUsername(e.target.value);
    }
    const handlePasswordChange =(e)=>{
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      let axios_url ="http://localhost:5000/api/users/all-users";
      axios(axios_url)
      .then(response => {
        let res = response.data;
        let usernameExists = false;
       
        res.forEach(currUser => {
          if (currUser.username===username) {console.log("found simliar usersname", currUser.username, "and",username);usernameExists=true}
        })
  
        if (usernameExists===true) {
          alert("Username already exists! Please try a different one");
        }
        else { //username does not exist yet, will register user w/ post request
          let axios_url = "http://localhost:5000/api/users/new-user";
          axios.post( axios_url,
          {
            firstName:firstName,
            lastName: lastName,
            username: username,
            password: password,
            correct: 0,
            fails: 0
          })
          .then(result => {
            handleRegistrationSubmit(result.data);
            console.log("register successful");
          })
          .catch(error => console.error("error:", error));
        }
      })
      .catch(error => console.error(error));
    }

        return (
            <form 
                className="registration-gui-form"
                onSubmit={ handleSubmit }>
            <label>Register</label>
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={handleFirstNameChange}
            placeholder="First Name"
          />
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={handleLastNameChange}
            placeholder="Last Name"
          />
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
          <div className="register-submit-button">
          <button  type="submit">Register</button>
            </div>
        </form>
        );
    
}
 
export default RegistrationGUI;