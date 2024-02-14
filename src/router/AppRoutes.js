import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../components/loginPage/Login';
import Home from '../components/homePage/Home';
import ProfilePage from '../components/profilePage/ProfilePage';
import rootStore from '../dataStore/RootStore';
import { observer } from 'mobx-react';

function AppRoutes() {
  const { ProfilStore } = rootStore;

  return (
    <Routes>
       <Route path='/' element={!ProfilStore.access_token ? <Login /> : <Navigate to="/home" />} />

      {ProfilStore.access_token === null && (
        <>
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path="/profile" element={<Navigate to="/" />} />
        </>
      )}

      {ProfilStore.access_token && (
        <Route path="/home" element={<Home />} />
      )}

      {ProfilStore.access_token && (
        <Route path="/profile" element={<ProfilePage />} />
      )}
    </Routes>
  );
}

export default observer(AppRoutes);
