import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import Payment from "./Payment";

const Verification = () => {
  const [show, setShow] = useState(true)
  const navigate = useNavigate()
  const [email, setEmail] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { data } = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/check-user`, { email })
    console.log(data)
    if (data.status === true) {
      setShow(false)
      toast.success("Proceed for Payment!");
      setTimeout(() => {
        navigate('/payment')
      }, 3000)
    }
    else {
      toast.warn("User does not exists", {
        setTimeout: 1500,
        transition: Slide
      })
      setTimeout(() => {
        navigate('/register')
      }, 3000)
    }
  }
  return (
    <>
      <h1>Join a Bacth</h1>
      {show === true ? (
        <>
          <div><u>Enter your details:</u></div>
          <br />
          <form onSubmit={handleSubmit}>
            <label>Enter Email:</label>
            <input type='email' value={email} id='email' onChange={(e) => setEmail(e.target.value)} />
            <br />
            <button type="submit">Submit</button>
          </form>
        </>
      ) : (
        <>
          <Payment />
        </>
      )}
      <ToastContainer />
    </>
  )
}

export default Verification