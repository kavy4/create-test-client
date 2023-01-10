import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const QuizOption = ({index, ResultFunction}) => {
  const quizSessionStorage = `question${index}`

  if (!sessionStorage.getItem(quizSessionStorage)) {
    sessionStorage.setItem(quizSessionStorage, JSON.stringify({ id: uuidv4(), question: '', answers: ['', '', ''], correct: '' }))
  }

  const quizSessionStorageBody = JSON.parse(sessionStorage.getItem(quizSessionStorage))
  
  const [question, setQuestion] = useState(quizSessionStorageBody.question)

  const [answer1, setAnswer1] = useState(quizSessionStorageBody.answers[0])
  const [answer2, setAnswer2] = useState(quizSessionStorageBody.answers[1])
  const [answer3, setAnswer3] = useState(quizSessionStorageBody.answers[2])
  const [correct, setCorrect] = useState(quizSessionStorageBody.correct)

  const CreateSessionStorage = (setState, event, ResultFunction) => {
    if (setState == 'setQuestion') {
      setQuestion(event)
      sessionStorage.setItem(quizSessionStorage, JSON.stringify({ id: quizSessionStorageBody.id, question: event, answers: [answer1, answer2, answer3], correct: correct }))
      // ResultFunction({ type: 'test', title: question, answers: [answer1, answer2, answer3], correct:  })
    }
    else {
      if (setState == 'setAnswer1') {
        setAnswer1(event)
        sessionStorage.setItem(quizSessionStorage, JSON.stringify({ id: quizSessionStorageBody.id, question: event, answers: [event, answer2, answer3], correct: correct }))
      }
      else {
        if (setState == 'setAnswer2') {
          setAnswer2(event)
          sessionStorage.setItem(quizSessionStorage, JSON.stringify({ id: quizSessionStorageBody.id, question: event, answers: [answer1, event, answer3], correct: correct }))
        }
        else {
          if (setState == 'setAnswer3') {
            setAnswer3(event)
            sessionStorage.setItem(quizSessionStorage, JSON.stringify({ id: quizSessionStorageBody.id, question: event, answers: [answer1, answer2, event], correct: correct }))
          }
          else {
            setCorrect(event)
            sessionStorage.setItem(quizSessionStorage, JSON.stringify({ id: quizSessionStorageBody.id, question: event, answers: [answer1, answer2, answer3], correct: event }))
            console.log('да')
          }
        }
      }
    }
  }
  
  return (
    <div className='quiz-card'>
        <label>Вопрос {question}</label>
        <input type="text" value={question} onChange={event => CreateSessionStorage('setQuestion', event.target.value)} />

        <div className='quiz-group'>
            <label>Ответ 1 {answer1}</label>
            <input type="text" value={answer1} onChange={event => CreateSessionStorage('setAnswer1', event.target.value)} />
        </div>

        <div className='quiz-group'>
            <label>Ответ 2 {answer2}</label>
            <input type="text" value={answer2} onChange={event => CreateSessionStorage('setAnswer2', event.target.value)} />
        </div>

        <div className='quiz-group'>
            <label>Ответ 3 {answer3}</label>
            <input type="text" value={answer3} onChange={event => CreateSessionStorage('setAnswer3', event.target.value)} />
        </div>

        <div className='group'>
          <label>Правильный ответ</label>
          <select onChange={event => {
            CreateSessionStorage('setCorrect', event.target.value)
          }}>
            <option selected disabled>----</option>
            {quizSessionStorageBody.correct != '' ? quizSessionStorageBody.answers.map((text, index) => {
              if (index == quizSessionStorageBody.correct) {
                return <option key={uuidv4()} value={index} selected>{index + 1}</option>
              }
              else {
                return <option key={uuidv4()} value={index}>{index + 1}</option>
              }
            }) : (quizSessionStorageBody.answers.map((text, index) => <option key={uuidv4()} value={index}>{index + 1}</option>))}

            {/* {() => {
              for (let index = 0; index < 3; index++) {
                if (index == quizSessionStorageBody.correct) {
                  return <option value={index} selected>{index + 1}</option>
                }
                else {
                  return <option value={index}>{index + 1}</option>
                }
              }
            }} */}
            {/* <option value="0">1</option>
            <option value="1">2</option>
            <option value="2">3</option> */}
          </select>
        </div>
    </div>
  )
}

export default QuizOption