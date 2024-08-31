import React from 'react'
import Header from '../Header/Header'
import { useDispatch, useSelector } from 'react-redux'
import { dec, inc } from '../state/action'
import { decreament, increament, increamentbyAmount } from './CounterSlice'

function Counter() {
    const count = useSelector(state => state.count)
    const dispatch = useDispatch()

    const count2 = useSelector(state => state.counter.count)

    return (
        <div>
            <Header />
            <div className='menu_container' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <button className='btn btn-danger mx-3' onClick={() => dispatch(dec())} >-</button>
                <h2>Count : {count}</h2>
                <button className='btn btn-success mx-3' onClick={() => dispatch(inc())} >+</button>
            </div>

            <div className='menu_container' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <button className='btn btn-danger mx-3' onClick={() => dispatch(decreament())} >-</button>
                <h2>Count : {count2}</h2>
                <button className='btn btn-success mx-3' onClick={() => dispatch(increament())} >+</button>
                <button className='btn btn-primary mx-3' onClick={() => dispatch(increamentbyAmount(5))} >+5</button>
            </div>
        </div>
    )
}

export default Counter
