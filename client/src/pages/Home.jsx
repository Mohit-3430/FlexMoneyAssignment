import React from 'react'
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
    <div>Welcome to the Yoga Classes online portal:</div>
    <button onClick={() => navigate("/register")}>New User Register</button>
    <button onClick={() => navigate("/verify")}>Returning user Visit Portal</button>
    </>
  )
}

export default Home