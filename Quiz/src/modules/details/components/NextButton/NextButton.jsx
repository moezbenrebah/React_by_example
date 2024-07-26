import './NextButton.css';

export default function NextButton({ dispatch, answer, index, numQuestions }) {
  if (answer === null) return null
  
  return (
    index < numQuestions -1  ? (
      <button 
        className='next-btn'
        onClick={() => dispatch({ type: 'nextQuestion' })}
      >
        Next
      </button>
    ) : (
      <button 
        className='display-result-btn'
        onClick={() => dispatch({ type: 'quizFinised' })}
      >
        finished
      </button>
    )
  )
}