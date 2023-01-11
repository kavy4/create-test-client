import React, { useState } from 'react'
import axios from './axios'

import './App.css'
import Header from './components/Header/Header'
import QuizList from './components/QuizList'

function App() {
  const [cardList, setCardList] = useState([])
  
  const [testObject, setTestObject] = useState([])

  const SaveDataFromInput = (data, index) => {
    const prevTestObject = testObject
    prevTestObject[index] = data
    delete prevTestObject[index].id
    setTestObject(prevTestObject)
    // console.log(testObject)
  }

  const SendTestInTelegram = () => {
    axios.post('/api/send-test-to-telegram', testObject)
    // console.log(testObject)
  }

  return (
    <div className="App">
      <Header />

      <button onClick={() => setCardList([...cardList, 'option'])}>Создать вопрос с вариантами ответа</button>

      <button onClick={() => setCardList([...cardList, 'input'])}>Создать вопрос с вводом ответа</button>

      <QuizList list={cardList} SaveDataFunction={SaveDataFromInput} inputData={testObject} />

      <button onClick={() => SendTestInTelegram()} disabled={!Boolean(cardList.length)}>Готово</button>
    </div>
  )
}

export default App