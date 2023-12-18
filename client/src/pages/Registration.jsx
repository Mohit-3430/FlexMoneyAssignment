import { useState } from "react"
import { ToastContainer, toast, Flip, Slide } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

import axios from "axios"

const Registration = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [age, setAge] = useState("")
  const [batch, setBatch] = useState("")
  const navigate = useNavigate();
  const batchEnum = {
    "S_6_7_AM": "6-7AM",
    "S_7_8_AM": "7-8AM",
    "S_8_9_AM": "8-9AM",
    "S_5_6_PM": "5-6PM"
  }

  const register = async (e) => {
    e.preventDefault();
    console.log(name, email, age, batch)
    const age_num = parseInt(age)
    if (age_num <= 18 || age_num >= 56) {
      toast.error("You must be between 18-56", {
        autoClose: 2000,
        transition: Slide,
      });
    }
    else {
      const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/register`, { name, email, age, batch });
      console.log(res.status);
      if (res.status === 201) {
        toast.success("Registration Completed!", {
          autoClose: 1500,
          transition: Slide,
        })
        setTimeout(() => {
          navigate('/verify')
        }, 3000)
      }
      else if (res.status === 200) {
        toast.warn("User already exists", {
          autoClose: 1500,
          transition: Slide
        })
      }
      else {
        toast.error("Registration Failed", {
          autoClose: 1500,
          transition: Flip
        })
      }
    }
  }

  return (
    <>
      <h1>Yoga Batch Registration</h1>

      <form onSubmit={register}>
        <label>Enter Name:</label>
        <input type='text' value={name} id='name' onChange={(e) => setName(e.target.value)} />
        <label>Email Id:</label>
        <input type='email' value={email} id='email' onChange={(e) => setEmail(e.target.value)} />
        <label>Age:</label>
        <input type='number' value={age} id='age' onChange={(e) => setAge(e.target.value)} />
        <label>Select Batch:</label>
        <select type='text' value={batch} id='batch' onChange={(e) => setBatch(e.target.value)}>
          <option value="">Select</option>
          <option value="S_6_7_AM">6-7AM</option>
          <option value="S_7_8_AM">7-8AM</option>
          <option value="S_8_9_AM">8-9AM</option>
          <option value="S_5_6_PM">5-6PM</option>
        </select>
        <br />
        <button type="submit">Register</button>
      </form>
      <ToastContainer />
    </>
  )
}

export default Registration