import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import './Todo2.css'

function Todo2() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [dataList, setDataList] = useState([])
  const [showUpdate, setShowUpdate] = useState(false)
  const [editData, setEditData] = useState([])

  const handleChange = (event, value) => {
    if (value === 'name') {
      setName(event.target.value)
    }
    if (value === 'phone') {
      setPhone(event.target.value)
    }
    if (value === 'address') {
      setAddress(event.target.value)
    }
  }

  useEffect(() => {
    const dataList = localStorage.getItem('todoList2')
    if (dataList) {
      setDataList(JSON.parse(dataList))
    }
  }, [])

  const clearForm = () => {
    setName('')
    setPhone('')
    setAddress('')
  }

  const submit = () => {
    if (name && phone && address) {
      const updateList = { name, phone, address }
      setDataList(prevState => {
        const data = [...prevState, updateList]
        localStorage.setItem('todoList2', JSON.stringify(data))
        return data
      })
      clearForm()
    }
  }

  const editList = (list) => {
    setName(list.name)
    setPhone(list.phone)
    setAddress(list.address)
    setShowUpdate(true)
    setEditData(list)
  }

  const update = () => {
    const updateData = dataList.map((val) =>
      val.phone === editData.phone ? { name: name, phone: phone, address: address } : val
    )
    setDataList(updateData)
    localStorage.setItem('todoList2', JSON.stringify(updateData))
    setShowUpdate(false)
    clearForm()
  }

  const deleteList = (list) => {
    const updateData = dataList.filter((val) => val.phone !== list.phone)
    setDataList(updateData)
    localStorage.setItem('todoList2', JSON.stringify(updateData))
    setShowUpdate(false)
    clearForm()
  }

  return (
    <div>
      <Header />
      <div className='row todo2_container'>
        <div className='col-sm-4'>
          <div className='todo_left'>
            <form>
              <div className='form-group'>
                <input type="text" className='form-control' placeholder='Enter Name' value={name}
                  onChange={(e) => handleChange(e, 'name')} />
              </div>
              <div className='form-group'>
                <input type="number" className='form-control' placeholder='Enter Phone' value={phone}
                  onChange={(e) => handleChange(e, 'phone')} maxLength={10} />
              </div>
              <div className='form-group'>
                <textarea type="text" className='form-control' placeholder='Enter Address' value={address}
                  onChange={(e) => handleChange(e, 'address')} />
              </div>
              {!showUpdate ?
                <button type='button' className='btn btn-outline-success' onClick={() => submit()}>
                  Submit
                </button> :
                <button type='button' className='btn btn-outline-success' onClick={() => update()}>
                  Update
                </button>
              }
            </form>
          </div>
        </div>
        <div className='col-sm-8'>
          <div className='todo_right'>
            <table className='table'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th width="200px;">Action</th>
                </tr>
              </thead>
              <tbody>
                {dataList.map((list, index) => (
                  <tr key={index}>
                    <td>{list.name}</td>
                    <td>{list.phone}</td>
                    <td>{list.address}</td>
                    <td className='action_buttons'>
                      <button className='btn btn-outline-warning' onClick={() => editList(list)}>Edit</button>
                      <button className='btn btn-outline-danger' onClick={() => deleteList(list)} >Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Todo2
