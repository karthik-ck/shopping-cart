import React, { useContext, useEffect, useState } from 'react'
import Header from '../Header/Header'
import './Menu2.css'
import { MenuContext } from '../state/menuContext'

function Menu2() {
    const { menuData, addToCart, cartItems, updateQty, deleteItem } = useContext(MenuContext)
    const [totalPrice , setTotalPrice] = useState(0)

    useEffect(() => {
        const totalArray = cartItems.map((val) => val.price)
        const total = totalArray.reduce((sum, item) => sum + item, 0)
        setTotalPrice(total)
    }, [cartItems])

    const addtoCart = (item) => {
        addToCart(item)
    }

    const qtyIncrease = (item, value) => {
        updateQty(item, value)
    }

    const qtyDecrease = (item, value) => {
        updateQty(item, value)
    }

    const deleteItems = (item) => {
        deleteItem(item)
    }

    return (
        <div>
            <Header />
            <div className='menu_container'>
                <div className='row'>
                    <div className='col-sm-8'>
                        <div className='menu_title'>
                            <h3>Menu List</h3>
                        </div>
                        <div className='row menu_cont'>
                            {menuData.map(item => (
                                <div className='col-sm-3' key={item.id}>
                                    <div className='item_card'>
                                        <img src={item.image} alt='' />
                                        <div className='item_body'>
                                            <span className='item_name'>{item.name}</span>
                                            <span className='item_price'>₹{item.price}</span>
                                        </div>
                                        <div className='add_to_cart'>
                                            <button onClick={() => addtoCart(item)} disabled={item.selected}>
                                                {item.selected ? 'Added to Cart' : 'Add to Cart'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='col-sm-4'>
                        <div>
                            <h3>&nbsp;</h3>
                        </div>
                        <div className='cart_items'>
                            <div className='cart_items_title'>
                                Cart Details
                            </div>
                            <div className='cart_item_menu'>
                                {cartItems.length ?
                                    <table className='table'>
                                        <tbody>
                                            {cartItems.map(item => (
                                                <tr key={item.id}>
                                                    <td width="160px;">
                                                        <img src={item.image} alt='' />
                                                        <span className='cart_item_name'>{item.name}</span>
                                                    </td>
                                                    <td>
                                                        <span className='cart_item_price'>₹{item.price}</span>
                                                    </td>
                                                    <td>
                                                        <div className='qty_box'>
                                                            <button onClick={() => qtyDecrease(item, 'decrease')}>-</button>
                                                            <span>{item.quantity}</span>
                                                            <button onClick={() => qtyIncrease(item, 'increase')}>+</button>
                                                        </div>
                                                    </td>
                                                    <td className='delete_icon'>
                                                        <button onClick={() => deleteItems(item)}>D</button>
                                                    </td>
                                                </tr>
                                            ))}
                                            <tr>
                                                <td>Total Price</td>
                                                <td>₹{totalPrice}</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                            </tr>
                                        </tbody>
                                    </table> :
                                    <div className='no_data'>
                                        No Data Found...
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Menu2