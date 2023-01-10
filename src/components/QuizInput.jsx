import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

const QuizInput = ({index, ResultFunction, SaveDataFunction, inputData}) => {
  if (!inputData[index]) {
    inputData[index] = {
      id: uuidv4(),
      type: 'user-input',
      title: '',
      answer: ''
    }
  }

  const [quiz, setQuiz] = useState(inputData[index])

  const CreateSessionStorage = async (setState, event) => {
    if (setState == 'setQuestion') {
      await setQuiz({ ...quiz, title: event })
    }
    else {
      await setQuiz({ ...quiz, answer: event })
    }

    SaveDataFunction(quiz, index)
  }

  return (
    <div className='quiz-card'>
        <label>Вопрос {quiz.title}</label>
        <input type="text" value={quiz.title} onChange={event => CreateSessionStorage('setQuestion', event.target.value)} />

        <div className='quiz-group'>
            <label>Ответ {quiz.answer}</label>
            <input type="text" value={quiz.answer} onChange={event => CreateSessionStorage('setAnswer', event.target.value)} />
        </div>
    </div>
  )
}

export default QuizInput