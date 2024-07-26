import './StartScreen.css';

export default function StartScreen (
  {
    numQuestions,
    dispatch
  }
) {

  return (
    <div className="screen">
      <h2 className="title">Welcome to the React Quiz!</h2>
      <p 
        className="text"
      >
        <span>{numQuestions}</span> questions to test your React knowledge!
      </p>
      <button 
        className="btn"
        onClick={() => dispatch({ type: 'start' })}
      >
        Let's quick off
      </button>
    </div>
  )
}
