import React from 'react'
import { Link } from 'react-router-dom'
import "./tools.scss"

const Tools = () => {
  return (
    <div className='tools__section'>
        <Link to={'/'}>Blur</Link>
        <Link to={'/embossing'}>Embossing</Link>
        <Link to={'/reduceSize'}>Reduce Size</Link>
        <Link>Edge Sharper</Link>
        <Link>Contrast</Link>
        <Link>Sharpen</Link>
        <Link>Smooth</Link>
        <Link>GrayScale</Link>
    </div>
  )
}

export default Tools