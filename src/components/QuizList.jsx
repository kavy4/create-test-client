import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import QuizOption from './QuizOption'
import QuizInput from './QuizInput'

const QuizList = ({list, ResultFunction, SaveDataFunction, inputData}) => {
  if (list.length != 0) {
    return (
      <div>
        {list.map((quiz, index) => {
          if (quiz == 'option') {
            return <QuizOption key={uuidv4()} index={index} ResultFunction={ResultFunction} SaveDataFunction={SaveDataFunction} inputData={inputData} />
          }
          else {
            return <QuizInput key={uuidv4()} index={index} ResultFunction={ResultFunction} SaveDataFunction={SaveDataFunction} inputData={inputData} />
          }
        })}
      </div>
    )
  }
  else {
    return (
      <h1 style={{margin: '25px auto'}}>Пусто</h1>
    )
  }

  
}

export default QuizList