import React from 'react'
import { Link } from "react-router-dom"

const Nav = () => {
    return (
        <>
            <div className='nav'>
                <ul className='nav-links'>
                    {/* <Link to='/' ><li>Home</li></Link>
                    <Link to='/register' ><li>Register</li></Link>
                    <Link to='/verify' ><li>Join</li></Link> */}

                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/register">Register</Link>
                    </li>
                    <li>
                        <Link to="/verify">Join</Link>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Nav