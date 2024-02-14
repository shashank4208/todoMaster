import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import rootStore from "../../dataStore/RootStore";
import { observer } from "mobx-react";

function Login() {
  const navigate = useNavigate();
  const {taskDataStore, ProfilStore} = rootStore;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validate = async () => {
    if (email === "" || password === "") {
        alert("Both fields are required!");
    } else {
        try {
            const response = await axios.post("https://api.escuelajs.co/api/v1/auth/login", {
                email: email,
                password: password,
            });

            const { access_token, refresh_token } = response.data;
            localStorage.setItem('access_token', access_token);
            localStorage.setItem('refresh_token', refresh_token);
            ProfilStore.access_token=access_token;
            // Wait for getProfile to complete before navigating
            await ProfilStore.getProfile(access_token);
            const userInfo=JSON.parse(localStorage.getItem('userInfo'))
            ProfilStore.profileData=userInfo.userData; 
            taskDataStore.tasks = userInfo.taskData;

            navigate('/home');
        } catch (error) {
            alert("Invalid  credentials!");
        }
    }
};


  return (
    <div className="loginPage">
      <div className="left-container">
        <p className="logo">ToDoMaster</p>
      </div>
      <div className="right-container">
        <div className="login-container">
          <p>Login to your account</p>
          <input
            type="text"
            className="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="pass"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="login-btn" onClick={validate}>
            Login Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default observer(Login);
