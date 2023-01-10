import React, { useState } from 'react'
import axios from './axios'

import './App.css'
import Header from './components/Header/Header'
import QuizList from './components/QuizList'

function App() {
  const [cardList, setCardList] = useState([])
  
  const [testObject, setTestObject] = useState([])

  const GetReadyObject = (quiz, index) => {
    const prevTestObject = testObject
    prevTestObject[index] = quiz

    setTestObject(prevTestObject)
  }

  const SendTestInTelegram = () => {
    axios.post('/api/send-test-to-telegram', testObject)
    console.log(testObject)
  }

  return (
    <div className="App">
      <Header />

      <button onClick={() => setCardList([...cardList, 'option'])}>Создать вопрос с вариантами ответа</button>

      <button onClick={() => setCardList([...cardList, 'input'])}>Создать вопрос с вводом ответа</button>

      <hr />
      <QuizList list={cardList} ResultFunction={GetReadyObject} />
      <hr />

      <button onClick={() => SendTestInTelegram()}>Готово</button>
    </div>
  )
}

export default App