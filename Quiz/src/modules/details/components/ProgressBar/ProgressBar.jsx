import './ProgressBar.css';

export default function ProgessBar({ index, numQuestions, points, maxPoints, answer }) {
    return (
        <header className="progress">
            <progress max={numQuestions} value={index + Number(answer !== null)}></progress>
            <div className="userProgress">
                <p>
                    Questions <strong>{index + 1}</strong>\{numQuestions}
                </p>
                <p>
                    <strong>score: {points}/</strong>{maxPoints}
                </p>
            </div>
        </header>
    )
}