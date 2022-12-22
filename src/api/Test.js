import React from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
const baseUrl= 'http://localhost:3000';
const Test = () => {
    const LoginUser = (data, type) => {
        const navigate = useNavigate()
        axios
          .post(`${baseUrl}/${type}/login`, data)
          .then(res => {
            console.log(res.data.token)
            if(res.status === 200) {
      
              navigate(`/${type}`)
              // window.location.href = `/${type}`;
              if(type==='admin') {
                sessionStorage.setItem("access_token", res.data.token);
                navigate(`/dashboard`)
                // window.location.href = `/dashboard`;
              }
            }
          } ) 
          .catch(err => console.error(err));

      }
  return (
    <div>Test</div>
  )
}

export default Test