import React from 'react'
import { Link } from 'react-router-dom'
import "./tools.scss"

const Tools = () => {
  return (
    <div className='tools__section'>
        <Link to={'/'}>Blur</Link>
        <Link to={'/embossing'}>Embossing</Link>
        <Link to={'/reduceSize'}>Reduce Size</Link>
        <Link to={'/grayScale'}>GrayScale</Link>
        <Link to={'/rotate'}>Rotate</Link>
        <Link to={'/sharpen'}>Sharpen</Link>
        <Link to={'/smooth'}>Smooth</Link>
        <Link to={'/detailEnhancer'}>Detail Enhancer</Link>
        <Link to={'/contour'}>Contour</Link>
        <Link>Edge Sharper</Link>
    </div>
  )
}

export default Tools