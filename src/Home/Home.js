import React from 'react'
import Header from '../Header/Header'
import './Home.css'
import homeImage from '../assets/Images/item-pic.png'
import { useNavigate } from 'react-router-dom'

function Home() {
    const navigate = useNavigate()
    const orderItem = () => {
        navigate('./menus')
    }
    
    return (
        <div>
            <Header />
            <div className='home_container'>
                <div className='row home_cont'>
                    <div className='col-sm-5 home_left'>
                        <h3><b>Welcome</b> to <br></br>The World of <br></br>Tasty & Fresh Food.</h3>
                        <p>The process consists of a customer choosing the restaurant of their choice, scanning the menu items, choosing an item, and finally choosing for pick-up or delivery</p>
                        <button onClick={orderItem}>
                            Order Items
                        </button>
                    </div>
                    <div className='col-sm-7 home_right'>
                        <img src={homeImage} alt='' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
