import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { convert } from "../utils/utils"
import { MdOutlineDone } from "react-icons/md";

const Payment = () => {
    // console.log(email)
    const [subid, setSubid] = useState("")
    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const [batch, setBatch] = useState("")
    const [status, setStatus] = useState("No")
    const [lastPaid, setLastPaid] = useState("")
    const { subId, emailId } = useParams();

    const batchEnum = {
        "S_6_7_AM": "6-7AM",
        "S_7_8_AM": "7-8AM",
        "S_8_9_AM": "8-9AM",
        "S_5_6_PM": "5-6PM"
    }
    const pay = async () => {
        toast.info("Payment Initiated!!", {
            autoClose: 1500
        })

        // update data

        const { data } = await axios.patch(`${import.meta.env.VITE_SERVER_URL}/api/sub-edit`, { subId, batch });
        console.log(data)
        setTimeout(() => {
            toast.success("Payment Successful")
        }, 2000)
    }

    useEffect(() => {
        const fetchSubData = async () => {
            const { data } = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/sub-data`, { subId })
            if (data.sub.status === false) setStatus("No")
            else setStatus("Active")
            if (data.sub.lastPaid === "") setLastPaid("NA")
            else setLastPaid(data.sub.last_paid)
            setBatch(data.sub.batch)
        }
        const fetchUData = async () => {
            const { data } = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/check-user`, { email: emailId })
            if (data.status === true) {
                setName(data.user.name)
                setAge(data.user.age)
            }
        }
        fetchSubData()
        fetchUData()
    }, [status])

    let lastPaidDate = convert(new Date(lastPaid))


    return (
        <>
            <h2>Payment Details</h2>
            <div><u>User Details</u></div>
            <div className="data">
                <p>Name: {name}</p>
                <p>Email : {emailId}</p>
                <p>Age : {age}</p>
                {status === "Active" && (<p style={{ color: "#008000" }}>Status: {status} <MdOutlineDone /></p>)}
                {status === "No" && (<p style={{ color: "red" }}>Status: {status}</p>)}
                <p>LastPaid: {lastPaidDate}</p>
                <p>Batch: {batchEnum[batch]}</p>
            </div >
            {status === "No" && (
                <>
                    <div>
                        <label>Change Batch if required:</label>
                        <select type='text' value={batch} id='batch' onChange={(e) => setBatch(e.target.value)}>
                            <option value="">Select</option>
                            <option value="S_6_7_AM">6-7AM</option>
                            <option value="S_7_8_AM">7-8AM</option>
                            <option value="S_8_9_AM">8-9AM</option>
                            <option value="S_5_6_PM">5-6PM</option>
                        </select>
                    </div>
                    <button onClick={() => pay()}>Pay ₹500</button>
                </>
            )}
            <ToastContainer />
        </>
    )
}

export default Payment