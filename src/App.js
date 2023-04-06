import React from 'react'
import { useGlobalContext } from './context/context'

import SetupForm from './components/SetupForm'
import Loading from './components/Loading'
import Modal from './components/Modal'
import { Button, IconButton } from '@mui/material'
import { Markup } from 'interweave'
import NightlightIcon from '@mui/icons-material/Nightlight'
import Brightness7Icon from '@mui/icons-material/Brightness7'

function App() {
  const {
    waiting,
    loading,
    questions,
    index,
    correct,
    nextQuestion,
    checkAnswer,
    theme,
    themeToggler,
  } = useGlobalContext()
  if (waiting) {
    return <SetupForm />
  }
  if (loading) {
    return <Loading />
  }
  const { question, incorrect_answers, correct_answer } = questions[index]
  const answers = [...incorrect_answers, correct_answer].sort(
    () => 0.5 - Math.random()
  )

  return (
    <main>
      <IconButton className='dark-mode-btn' size='large' onClick={themeToggler}>
        {theme === 'light' ? <NightlightIcon /> : <Brightness7Icon />}
      </IconButton>
      <Modal />
      <section className='quiz'>
        <p className='correct-answers'>
          correct answers : {correct} / {index}
        </p>
        <article className='container'>
          <h4>
            <Markup content={question} />
          </h4>
          <div className='btn-container'>
            {answers.map((answer, index) => {
              return (
                <Button
                  variant='outlined'
                  key={index}
                  className='answer-btn'
                  onClick={() => {
                    checkAnswer(correct_answer === answer)
                  }}>
                  <Markup content={answer} />
                </Button>
              )
            })}
          </div>
        </article>
        <div className='next'>
          <Button className='next-question' onClick={nextQuestion}>
            next question
          </Button>
        </div>
      </section>
    </main>
  )
}

export default App
