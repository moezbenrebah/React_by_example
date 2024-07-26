import { useState, useEffect } from 'react';
import './FinishScreen.css';

export default function FinishScreen({ points, maxPoints, highscore,dispatch }) {
    // const [showButton, setShowButton] = useState(false);
    const percentage = (points / maxPoints) * 100;

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setShowButton(true)
    //     }, 2000)

    //     return () => clearTimeout(timer)
    // }, [])

    return (
        <>
            <p className="result">
                <span>You scored <strong>{points}</strong> out of {maxPoints} ({Math.ceil(percentage)}%)</span>
            </p>
            <p className="high-score">
                <span>High score: <strong>{highscore}</strong> points</span>
            </p>
            {/* {showButton ? (
                <button className='restart-quiz'
                    onClick={() => dispatch({ type: 'restart'})}
                >
                    restart
                </button>
            ) : null} */}
            <button className='restart-quiz'
                onClick={() => dispatch({ type: 'restart'})}
            >
                restart
            </button>
        </>
    );
}
