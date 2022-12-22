import React from 'react'
import User from "./UserContext"
import { useState } from 'react';
const UserState = ({ children }) => {
 
  const [manage, setManage] = useState({
    isLoggedIn: false,
    authToken: '',
    usertype: '',
    userdetails: ''

  })
  const loginHandler = (data) => {
    setManage((prev) => (
      {
        ...prev,
        isLoggedIn: data.isLoggedIn,
        authToken: data.token,
        usertype: data.type,
        userdetails: data.userDetails
      }
    ))
  };
  return (
    <User.Provider value={{
      loginHandler, manage, setManage
    }}>
        {children}
    </User.Provider>
  )
}

export default UserState;