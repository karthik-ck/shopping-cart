import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'

function Timer() {
    const [minutes, setMinutes] = useState(1)
    const [seconds, setSeconds] = useState(0)
    const [isActive, setIsActive] = useState(false)
    const [linkActive, setLinkActive] = useState(false)

    const startTimer = () => {
        setIsActive(true)
    }

    const reset = () => {
        setIsActive(false)
        setMinutes(1)
        setSeconds(0)
        setLinkActive(false)
    }

    useEffect(() => {
        let countdown = null;
        if (isActive) {
            countdown = setInterval(() => {
                if (seconds > 0) {
                    setSeconds(seconds - 1)
                }
                if (seconds === 0) {
                    if (minutes === 0) {
                        clearInterval(countdown)
                        setLinkActive(true)
                        setIsActive(false)
                    } else {
                        setMinutes(minutes - 1)
                        setSeconds(59)
                    }
                }
            }, 1000)
        } else {
            clearInterval(countdown)
        }

        const clear = () => clearInterval(countdown)
        return clear
    }, [linkActive, isActive, seconds, minutes])

    return (
        <div>
            <Header />
            <div style={{ textAlign: 'center' }}>
                <h1>
                    {minutes} : {seconds < 10 ? `0${seconds}` : seconds}
                </h1>
                <button className='btn btn-primary mx-3' onClick={startTimer}>Start Timer</button>
                <button className='btn btn-info' onClick={reset}>Reset</button>
                <br></br>
                <button className='btn btn-warning mt-3' disabled={!linkActive}>Open Link</button>
            </div>
        </div>
    )
}

export default Timer
