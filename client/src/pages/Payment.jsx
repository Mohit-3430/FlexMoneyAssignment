import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { checkExpiry, convert } from "../utils/utils"
import { MdOutlineDone } from "react-icons/md";
import Nav from "../components/Nav";

const Payment = () => {
    const [subid, setSubid] = useState("")
    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const [batch, setBatch] = useState("")
    const [status, setStatus] = useState("No")
    const [lastPaid, setLastPaid] = useState("")
    const { subId, emailId } = useParams();
    const [currld, setCurrLd] = useState("NA")

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

        const resp = await axios.patch(`${import.meta.env.VITE_SERVER_URL}/api/sub-edit`, { subId, batch, status: true });
        setStatus(resp.data.status)
        setTimeout(() => {
            toast.success("Payment Successful")
        }, 2000)
    }

    useEffect(() => {
        const fetch = async () => {
            const { data } = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/sub-data`, { subId })
            localStorage.setItem("last_paid", data.sub.last_paid)
            if (data.sub.status === false) setStatus("No")
            else setStatus("Active")
            if (data.sub.lastPaid === undefined) setLastPaid("NA")
            else setLastPaid(data.sub.last_paid)
            setBatch(data.sub.batch)

            //
            const resp = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/check-user`, { email: emailId })
            if (resp.data.status === true) {
                setName(resp.data.user.name)
                setAge(resp.data.user.age)
            }
            // 
            const expire_check = checkExpiry(localStorage.getItem("last_paid"))
            console.log(expire_check)
            if (status === "Active")
                setCurrLd(convert(localStorage.getItem("last_paid")))

            if (expire_check !== "Active") {
                await axios.patch(`${import.meta.env.VITE_SERVER_URL}/api/sub-expiry`, { subId });
            }

        }
        fetch()

    }, [status])

    return (
        <>
            <Nav />
            <h2>Payment Details</h2>
            <div><u>User Details</u></div>
            <div className="data">
                <p>Name: {name}</p>
                <p>Email : {emailId}</p>
                <p>Age : {age}</p>
                {status === "Active" && (<p style={{ color: "#008000" }}>Status: {status} <MdOutlineDone /></p>)}
                {status === "No" && (<p style={{ color: "red" }}>Status: {status}</p>)}
                <p>LastPaid: {currld}</p>
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