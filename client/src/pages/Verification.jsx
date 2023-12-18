import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"

const Verification = () => {
  const navigate = useNavigate()
  const [subid, setSubid] = useState("")
  const [email, setEmail] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/check-user`, { email })
      setSubid(data.user.subscriptionId);
      if (data.status === true) {
        setTimeout(() => {
          toast.success("proceed for Payment", {
            autoClose: 1500
          })
          navigate(`/payment/${email}/${data.user.subscriptionId}`)
        }, 5000)

      }
      else {
        toast.warn("User does not exists", {
          autoClose: 1500,
          transition: Slide
        })
        setTimeout(() => {
          navigate('/register')
        }, 3000)
      }
    }
    catch (err) {
      console.log(err)
      toast.warn("User does not exists", {
        autoClose: 1500,
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

      <div><u>Enter your details:</u></div>
      <br />
      <form onSubmit={handleSubmit}>
        <label>Enter Email:</label>
        <input type='email' value={email} id='email' onChange={(e) => setEmail(e.target.value)} />
        <br />
        <button type="submit">Submit</button>
      </form>


      <ToastContainer />
    </>
  )
}

export default Verification