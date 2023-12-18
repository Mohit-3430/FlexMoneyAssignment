import React from 'react'
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>Welcome to the Yoga Classes online portal:</div>
      <button onClick={() => navigate("/register")}>New User Registeration</button>
      <button onClick={() => navigate("/verify")}>Returning user Portal</button>
    </>
  )
}

export default Home