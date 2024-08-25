import React, { useContext, useEffect, useState } from 'react'
import Header from '../Header/Header'
import './Cart.css'
import { MenuContext } from '../state/menuContext'

function Cart() {
  const { cartItems, updateQty, deleteItem, clearCart } = useContext(MenuContext)
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    const totalArray = cartItems.map((val) => val.price)
    const total = totalArray.reduce((sum, item) => sum + item, 0)
    setTotalPrice(total)
  }, [cartItems])

  const qtyIncrease = (item, value) => {
    updateQty(item, value)
  }

  const qtyDecrease = (item, value) => {
    updateQty(item, value)
  }

  const deleteItems = (item) => {
    deleteItem(item)
  }

  const bookOrder = () => {
    alert("Order Booked Successfully...")
    localStorage.removeItem("cartItems2")
    clearCart()
  }

  return (
    <div>
      <Header />
      <div className='my_cart_container'>
        <div className='my_cart'>
          <div className='my_cart_title'>
            <h4>My Cart</h4>
          </div>
          <div className='cart_item_menu'>
            {cartItems.length ?
              <table className='table'>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>
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
                        <button onClick={() => deleteItems(item)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>Total Price : ₹{totalPrice}</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                </tbody>
              </table> :
              <div className='no_data'>
                No Data Found...
              </div>
            }
            {cartItems.length ?
              <div className='book_order'>
                <button onClick={()=>bookOrder()}>Book Order</button>
              </div> : <></>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
