import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from './pages/Registration';
import Verification from "./pages/Verification";
import Home from './pages/Home';
function App() {

  return (
    <>
      <Router> 
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path="/register" element={<Registration/>} />
          <Route path="/verify" element={<Verification/>} />
        </Routes> 
        </Router>
    </>
  )
}

export default App
