import './Timer.css'

import { useEffect } from "react"

export default function Timer({ dispatch, secondsRemaining }) {
    const mins = Math.floor(secondsRemaining / 60);
    const secs = secondsRemaining % 60;

    useEffect(() => {
        const id = setInterval(() => {
            dispatch({type: 'countdown'})
        }, 1000)
        return () => clearInterval(id)
    }, [dispatch])

    return (
        <div className="timer">
            time remain: <strong>{mins}:{secs}</strong>
        </div>
    )
}