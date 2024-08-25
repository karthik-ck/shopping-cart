import React from 'react'
import './Header.css'
import foodieIcon from '../assets/Images/foodie-icon.jpg';
import logoutImage from '../assets/Images/log-out.png';
import {Link} from 'react-router-dom'

function Header() {
    return (
        <div className="header_container">
            <div className='header_inner'>
                <div className='row'>
                    <div className='col-sm-4'>
                        <div className='header_title'>
                            <img src={foodieIcon} alt='' />
                            <span>FOODies</span>
                        </div>
                    </div>
                    <div className='col-sm-8 header_right'>
                        <ul className='header_menus'>
                            <li><Link to='/'>Home</Link></li>
                            <li><Link to='/menus'>Menu 1</Link></li>
                            <li><Link to='/menus2'>Menu 2</Link></li>
                            <li><Link to='/my-cart'>My Cart</Link></li>
                        </ul>
                        <div className='logout'>
                            Logout
                            <img src={logoutImage} alt='' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header