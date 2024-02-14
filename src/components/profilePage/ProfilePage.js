import React, { useEffect } from "react";
import "./ProfilePage.css";
import rootStore from "../../dataStore/RootStore";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
// import axios from 'axios'

function ProfilePage() {
  const { ProfilStore } = rootStore;
  const userInfo = ProfilStore.profileData;
  const navigate=useNavigate();
  useEffect(()=>{
    if(ProfilStore.access_token){
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      ProfilStore.profileData = userInfo.userData;
    }
  },[])

  const navigateBack=()=>{
    navigate('/home')
  }

  const logout=()=>{
    ProfilStore.clearData();
    navigate('/')
  }

  // useEffect(()=>{
  // },[])

  return (
    <div className="profile-page">
      <div className="profile-container">
        <p className="details">User Details</p>
        <span></span>
        <div className="userTitle common-title">
          <p> User Name :</p>
          <p className="userName common-style">{userInfo.name}</p>
        </div>
        <div className="emailTitle common-title">
          <p>Email :</p>
          <p className="emailAddress common-style">{userInfo.email}</p>
        </div>
        <div className="passTitle common-title">
          <p>Password :</p>
          <p className="password common-style">{userInfo.password}</p>
        </div>
        <button className="back-btn" onClick={navigateBack}>Back</button>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </div>
    </div>
  );
}

export default observer(ProfilePage);
