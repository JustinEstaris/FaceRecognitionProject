import React from 'react'
import Tilt from 'react-parallax-tilt';
import brain from './brain.png';
import './Logo.css';

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className="Tilt br2 shadow-2">
                <h1 className="pa3"><img className="pt2" alt='logo' src={brain} /></h1>
            </Tilt>
        </div>
    )
}

export default Logo;