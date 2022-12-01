import React from 'react'
import './navbar.scss'
import {BsImageAlt} from 'react-icons/bs'
const Navbar = () => {
  return (
    <nav>
        <h2><BsImageAlt/> Edit Pro</h2>
        <ul>
            <li>Home</li>
            <li>Crop</li>
            <li>Saturate</li>
            <li>Sharpen</li>
            <li>Enhancer</li>
        </ul>
    </nav>
  )
}

export default Navbar