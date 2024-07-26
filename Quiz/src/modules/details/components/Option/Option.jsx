import './Option.css';

export default function Option({ question, dispatch, answer }) {
  return (
    <div>
      <div className="option">
        {
          question.options.map((option, index) => 
            <button 
              className={
                `
                  question-btn 
                  ${index === answer ? 'answer' : ''} 
                  ${ 
                    answer !== null ? 
                    index === question.correctOption ? 
                    'correct' : 
                    'wrong' : 
                    '' 
                  }
                `
              }
              key={option}
              disabled={ answer !== null }
              onClick={() => dispatch({ type: 'newAnswer', payload: index })}
            >
              {option}
            </button>
          )
        }
      </div>
    </div>
  )
}
