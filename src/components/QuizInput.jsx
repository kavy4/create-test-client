import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const QuizInput = ({index, ResultFunction}) => {
  const quizSessionStorage = `question${index}`

  if (!sessionStorage.getItem(quizSessionStorage)) {
    sessionStorage.setItem(quizSessionStorage, JSON.stringify({ id: uuidv4(), question: '', answer: '' }))
  }

  const quizSessionStorageBody = JSON.parse(sessionStorage.getItem(quizSessionStorage))

  const [question, setQuestion] = useState(quizSessionStorageBody.question)
  const [answer, setAnswer] = useState(quizSessionStorageBody.answer)

  const CreateSessionStorage = (setState, event) => {
    if (setState == 'setQuestion') {
      setQuestion(event)
      sessionStorage.setItem(quizSessionStorage, JSON.stringify({ id: quizSessionStorageBody.id, question: event, answer: answer }))
      ResultFunction({ type: 'user-input', title: event, correct: answer }, index)
    }
    else {
      setAnswer(event)
      sessionStorage.setItem(quizSessionStorage, JSON.stringify({ id: quizSessionStorageBody.id, question: question, answer: event }))
      ResultFunction({ type: 'user-input', title: question, correct: event }, index)
    }
  }

  return (
    <div className='quiz-card'>
        <label>Вопрос {question}</label>
        <input type="text" value={question} onChange={event => CreateSessionStorage('setQuestion', event.target.value)} />

        <div className='quiz-group'>
            <label>Ответ {answer}</label>
            <input type="text" value={answer} onChange={event => CreateSessionStorage('setAnswer', event.target.value)} />
        </div>
    </div>
  )
}

export default QuizInput