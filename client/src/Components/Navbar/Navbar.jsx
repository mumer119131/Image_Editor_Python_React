import React from 'react'
import './navbar.scss'
import {BsImageAlt} from 'react-icons/bs'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
        <h2><BsImageAlt/> Edit Pro</h2>
        <ul>
            <li><Link to={"/"}>Blur</Link></li>
            <li ><Link to={"embossing"}>Embossing</Link></li>
            <li><Link to={"crop"}>Crop</Link></li>
            <li><Link to={"sharpen"}>Sharpen</Link></li>
            <li><Link to={"enhancer"}>Enhancer</Link></li>
        </ul>
    </nav>
  )
}

export default Navbar