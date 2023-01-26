import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import QuizOption from './QuizOption'
import QuizInput from './QuizInput'

const QuizList = ({list, SaveDataFunction, inputData}) => {
  if (list.length != 0) {
    return (
      <div className='quiz-list'>
        {list.map((quiz, index) => {
          if (quiz == 'option') {
            return <QuizOption key={uuidv4()} index={index} SaveDataFunction={SaveDataFunction} inputData={inputData} />
          }
          else {
            return <QuizInput key={uuidv4()} index={index} SaveDataFunction={SaveDataFunction} inputData={inputData} />
          }
        })}
      </div>
    )
  }
  else {
    return (
      <div>
        <hr />
        <h1 style={{margin: '25px auto', textAlign: 'center'}}>Пусто</h1>
        <hr />
      </div>
      
    )
  }

  
}

export default QuizList