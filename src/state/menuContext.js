import React, { createContext, useEffect, useState } from 'react'
import menuItems from '../Items2.json'

export const MenuContext = createContext()

export function MenuProvider({ children }) {
  const [menuData, setMenuData] = useState(menuItems.items)
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    const cartData = localStorage.getItem('cartItems2')
    if (cartData) {
      setCartItems(JSON.parse(cartData))
      menuData.forEach((val)=>{
        JSON.parse(cartData).forEach((item)=>{
          if(val.id === item.id){
            val.selected = item.selected
          }
        })
      })
    }
  }, [])

  const addToCart = (item) => {
    item.quantity = 1
    item.selected = true
    setCartItems(prevState => {
      const updatedCart = [...prevState, item]
      localStorage.setItem("cartItems2", JSON.stringify(updatedCart))
      return updatedCart
    })
  }

  const updateQty = (item, value) => {
    let updatedQty = 0
    if (value === 'increase') {
      updatedQty = item.quantity + 1
    } else {
      updatedQty = item.quantity - 1
    }
    const updatedPrice = item.price / item.quantity * updatedQty
    const updatedItem = cartItems.map((val) => (
      val.id === item.id ? { ...val, quantity: updatedQty, price: updatedPrice } : val
    ))
    setCartItems(updatedItem)
    localStorage.setItem("cartItems2", JSON.stringify(updatedItem))
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
      localStorage.setItem("cartItems2", JSON.stringify(updatedItem))

      menuData.map((val) => {
        if (val.id === item.id) {
          val.selected = false;
          val.quantity = 0;
        }
        return val;
      })
    }
  }

  const clearCart = () => {
    setCartItems([])
    menuData.forEach((val) => {
      val.selected = false;
      val.quantity = 0;
    })
  }

  return (
    <MenuContext.Provider value={{ menuData, addToCart, cartItems, updateQty, deleteItem, clearCart }}>
      {children}
    </MenuContext.Provider>
  )
}
