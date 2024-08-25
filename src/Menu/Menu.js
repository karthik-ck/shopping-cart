import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import './Menu.css'
import menuItems from '../Items.json'

function Menu() {
  const [cartItems, setCartItems] = useState([])
  const [totalPriceArray, setTotalPriceArray] = useState([])

  useEffect(() => {
    const cartData = localStorage.getItem("cartItems");
    if (cartData) {
      setCartItems(JSON.parse(cartData))
      const total = JSON.parse(cartData).map(val=>val.price)
      setTotalPriceArray(total)
      menuItems.items.forEach((val)=>{
        JSON.parse(cartData).forEach((cart)=>{
          if(val.id === cart.id){
            val.selected = cart.selected
          }
        })
      })
    }
  }, [])

  const addtoCart = (event, item) => {
    item.quantity = 1
    item.selected = true
    setCartItems(prevState => {
      const updateCart = [...prevState, item]
      localStorage.setItem("cartItems", JSON.stringify(updateCart))
      return updateCart
    })
    setTotalPriceArray(prevState => [...prevState, item.price])
  }

  const qtyIncrease = (item) => {
    const updatedQty = item.quantity + 1
    const updatedPrice = item.price / item.quantity * updatedQty
    const updatedItem = cartItems.map((val) =>
      val.id === item.id ? { ...val, quantity: updatedQty, price: updatedPrice } : val
    )
    setCartItems(updatedItem)
    localStorage.setItem("cartItems", JSON.stringify(updatedItem))
    const findIndex = cartItems.findIndex((val) => val.id === item.id)
    totalPriceArray[findIndex] = updatedPrice
  }

  const qtyDecrease = (item) => {
    const updatedQty = item.quantity - 1
    const updatedPrice = item.price / item.quantity * updatedQty
    const updatedItem = cartItems.map((val) =>
      val.id === item.id ? { ...val, quantity: updatedQty, price: updatedPrice } : val
    )
    setCartItems(updatedItem)
    localStorage.setItem("cartItems", JSON.stringify(updatedItem))
    const findIndex = cartItems.findIndex((val) => val.id === item.id)
    totalPriceArray[findIndex] = updatedPrice
    if (updatedQty < 1) {
      deleteItem(item)
    }
  }

  const deleteItem = (item) => {
    const findIndex = cartItems.findIndex((val) => val.id === item.id)
    if (findIndex > -1) {
      item.selected = false;
      const updatedItem = cartItems.filter((val) => val.id !== item.id)
      setCartItems(updatedItem)
      localStorage.setItem("cartItems", JSON.stringify(updatedItem))

      const updateTotal = [...totalPriceArray]
      updateTotal[findIndex] = 0
      setTotalPriceArray(updateTotal)
      const newTotal = updatedItem.map((val) => val.price * val.quantity)
      setTotalPriceArray(newTotal)

      menuItems.items.map((val) => {
        if (val.id === item.id) {
          val.quantity = 0;
          val.selected = false;
        }
        return val
      })
    }
  }

  const getTotal = () => {
    return totalPriceArray.reduce((sum, acc) => acc + sum, 0)
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
              {menuItems.items.map(item => (
                <div className='col-sm-3' key={item.id}>
                  <div className='item_card'>
                    <img src={item.image} alt='' />
                    <div className='item_body'>
                      <span className='item_name'>{item.name}</span>
                      <span className='item_price'>₹{item.price}</span>
                    </div>
                    <div className='add_to_cart'>
                      <button onClick={(e) => addtoCart(e, item)} disabled={item.selected}>
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
                          <td>
                            <img src={item.image} alt='' />
                            <span className='cart_item_name'>{item.name}</span>
                          </td>
                          <td>
                            <span className='cart_item_price'>₹{item.price}</span>
                          </td>
                          <td>
                            <div className='qty_box'>
                              <button onClick={() => qtyDecrease(item)}>-</button>
                              <span>{item.quantity}</span>
                              <button onClick={() => qtyIncrease(item)}>+</button>
                            </div>
                          </td>
                          <td className='delete_icon'>
                            <button onClick={() => deleteItem(item)}>De</button>
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <td>Total Price</td>
                        <td>₹{getTotal()}</td>
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

export default Menu
