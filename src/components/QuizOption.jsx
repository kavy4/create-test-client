import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const QuizOption = ({index, ResultFunction, SaveDataFunction, inputData}) => {
  if (!inputData[index]) {
    inputData[index] = {
      id: uuidv4(),
      type: 'test',
      title: '',
      answers: ['', '', ''],
      correct: ''
    }
  }

  const [quiz, setQuiz] = useState(inputData[index])

  const CreateSessionStorage = async (setState, event) => {
    if (setState == 'setQuestion') {
      await setQuiz({
        ...quiz,
        title: event
      })
    }
    else {
      if (setState == 'setAnswer1') {
        await setQuiz({
          ...quiz,
          answers: quiz.answers.map((item, index) => {
            if (index == 0) {
              return event
            }
            else {
              return item
            }
          })
        })
      }
      else {
        if (setState == 'setAnswer2') {
          await setQuiz({
            ...quiz,
            answers: quiz.answers.map((item, index) => {
              if (index == 1) {
                return event
              }
              else {
                return item
              }
            })
          })
        }
        else {
          if (setState == 'setAnswer3') {
            await setQuiz({
              ...quiz,
              answers: quiz.answers.map((item, index) => {
                if (index == 2) {
                  return event
                }
                else {
                  return item
                }
              })
            })
          }
          else {
            await setQuiz({
              ...quiz,
              correct: event
            })
          }
        }
      }
    }

    SaveDataFunction(quiz, index)
  }
  
  return (
    <div className='quiz-card'>
        <label>Вопрос {quiz.title}</label>
        <input type="text" value={quiz.title} onChange={event => CreateSessionStorage('setQuestion', event.target.value)} />

        <div className='quiz-group'>
            <label>Ответ 1 {quiz.answers[0]}</label>
            <input type="text" value={quiz.answers[0]} onChange={event => CreateSessionStorage('setAnswer1', event.target.value)} />
        </div>

        <div className='quiz-group'>
            <label>Ответ 2 {quiz.answers[1]}</label>
            <input type="text" value={quiz.answers[1]} onChange={event => CreateSessionStorage('setAnswer2', event.target.value)} />
        </div>

        <div className='quiz-group'>
            <label>Ответ 3 {quiz.answers[2]}</label>
            <input type="text" value={quiz.answers[2]} onChange={event => CreateSessionStorage('setAnswer3', event.target.value)} />
        </div>

        <div className='group'>
          <label>Правильный ответ</label>
          <select onChange={event => {
            CreateSessionStorage('setCorrect', event.target.value)
          }}>
            <option disabled>----</option>
            {quiz.correct != '' ? quiz.answers.map((text, index) => {
              if (index == quiz.correct) {
                return <option key={index} selected value={index}>{index + 1}</option>
              }
              else {
                return <option key={index} value={index}>{index + 1}</option>
              }
            }) : (quiz.answers.map((text, index) => <option key={index} value={index}>{index + 1}</option>))}
          </select>
        </div>
    </div>
  )
}

export default QuizOption