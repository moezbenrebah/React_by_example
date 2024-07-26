import { useEffect, useReducer } from 'react';
import './App.css';
import Header from '../Header';
import Home from '../Home';
import Question from '../../../details/components/Question';
import NextButton from '../../../details/components/NextButton/NextButton';
import Loader from '../../../common/components/Loader/Loader';
import ErrorUI from '../../../common/components/ErrorUI';
import StartScreen from '../StartScreen/StartScreen';
import ProgessBar from '../../../details/components/ProgressBar/ProgressBar';
import FinishScreen from '../FinishScreen/FinishScreen';
import Timer from '../../../common/components/Timer/Timer';

const SECS_PER_QUESTIONS = 3;

const initialState = {
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch(action.type) {
    case 'dataReceived':
      return { 
        ...state,
        questions: action.payload, 
        status: 'ready'
      }
    case 'dataFailed':
      return {
        ...state,
        status: 'error'
      }
    case 'start': 
      return {
        ...state,
        status: 'active',
        secondsRemaining: state.questions.length * SECS_PER_QUESTIONS
      }
    case 'newAnswer':
      const question = state.questions.at(state.index)
      return {
        ...state,
        answer: action.payload,
        points: action.payload === question.correctOption ? 
          state.points + question.points : 
          state.points,
      }
    case 'nextQuestion':
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      }
    case 'quizFinised':
      return {
        ...state,
        status: 'finished',
        highscore:
          state.points > state.highscore ? 
            state.points : 
            state.highscore
      }
    case 'restart':
      return {
        ...initialState,
        highscore: state.highscore,
        status: 'ready',
        questions: state.questions,
      }
    case 'countdown':
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? 'finished' : state.status,
      }
    default:
      throw new Error('Action unknown')
  }
};

export default function App() {
  // const [state, dispatch] = useReducer(reducer, initialState)
  const [{ questions, status, index, answer, points, highscore, secondsRemaining }, dispatch] = useReducer(reducer, initialState)

  const numQuestions = questions.length;
  const maxPoints = questions.reduce((prev, curr) => prev + curr.points, 0)

  useEffect(() => {
    fetch('http://localhost:8000/questions')
      .then(res => res.json())
      // Step 1:
      // .then(data => console.log(data))
      .then(data => dispatch({ type: 'dataReceived', payload: data }))
      .catch(err => dispatch({ type: 'dataFailed' }))
  }, [])

  return (
    <div className='app'>
      <Header/>
      <Home>
        {status === 'loading' ? (
            <Loader />
          ) : status === 'error' ? (
            <ErrorUI />
          ) : status === 'ready' ? (
            <StartScreen 
              numQuestions={ numQuestions } 
              dispatch={ dispatch }
            />
          ) : status === 'active' ? (
            <>
              <Timer 
                secondsRemaining={ secondsRemaining }
                dispatch={ dispatch }
              />
              <ProgessBar 
                index={ index } 
                numQuestions={ numQuestions } 
                points={ points } 
                maxPoints={ maxPoints}
                answer={ answer }
              />
              <Question 
                question={ questions[index] }
                dispatch={ dispatch }
                answer={ answer }
              />
              <NextButton
                index={ index } 
                numQuestions={ numQuestions }
                dispatch={ dispatch }
                answer={ answer }
              />
            </>
          ) : null
        }
        { status === 'finished' ? 
          <FinishScreen
            points={ points }
            maxPoints={ maxPoints }
            dispatch={ dispatch }
            highscore={ highscore }
          /> :
          null
        }
      </Home>
    </div>
  )
}
