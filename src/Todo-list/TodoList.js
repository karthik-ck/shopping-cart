import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import './TodoList.css'

function TodoList() {
    const [textFeild, setTextFeild] = useState('')
    const [list, setList] = useState([])
    const [showUpdate, setShowUpdate] = useState(false)
    const [editIndex, setEditIndex] = useState(null)

    const textHandler = (event) => {
        setTextFeild(event.target.value)
    }

    const add = () => {
        if (textFeild) {
            setList(prevState => {
                const updateList = [...prevState, textFeild]
                localStorage.setItem("todoList", JSON.stringify(updateList))
                return updateList
            })
            setTextFeild('')
        }
    }

    useEffect(() => {
        const data = localStorage.getItem("todoList")
        if (data) {
            setList(JSON.parse(data))
        }
    }, [])

    const deleteList = (li) => {
        const findList = list.findIndex((val) => val === li)
        if (findList > -1) {
            const updateList = list.filter((val) => val !== li)
            setList(updateList)
            setTextFeild('')
            localStorage.setItem("todoList", JSON.stringify(updateList))
        }
    }

    const editList = (li, index) => {
        setTextFeild(li)
        setShowUpdate(true)
        setEditIndex(index)
    }

    const update = () => {
        list[editIndex] = textFeild
        localStorage.setItem("todoList", JSON.stringify(list))
        setShowUpdate(false)
        setEditIndex(null)
        setTextFeild('')
    }

    return (
        <div>
            <Header />
            <div className='todo-list-container'>
                <div className='todo-input'>
                    <input type="text" className='form-control' placeholder='Enter Text Here...'
                        onChange={(e) => textHandler(e)} value={textFeild} />
                    {!showUpdate ?
                        <button type='submit' className='btn btn-primary' onClick={() => add()} >Add</button>
                        : <button type='submit' className='btn btn-primary' onClick={() => update()} >Update</button>
                    }
                </div>
                <div className='table_container'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Content</th>
                                <th width='200px;'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((li, index) => (
                                <tr key={index}>
                                    <td>{li}</td>
                                    <td className='action_buttons'>
                                        <button className='btn btn-warning' onClick={() => editList(li, index)}>Edit</button>
                                        <button className='btn btn-danger' onClick={() => deleteList(li)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default TodoList
