import React from 'react'
import { useGlobalContext } from '../context/context'
import { Button } from '@mui/material'
const Modal = () => {
  const { isModalOpen, closeModal, correct, questions } = useGlobalContext()
  const percent = ((correct / questions.length) * 100).toFixed(0)
  return (
    <div
      className={`${
        isModalOpen ? 'modal-container isOpen' : 'modal-container'
      }`}>
      <div className='modal-content'>
        <h2>{percent >= 50 ? `congrats ! 😺` : `shame on you ! 🙀`}</h2>
        <p>you answered {percent}% of questions correctly</p>
        <Button className='close-btn' onClick={closeModal}>
          play again
        </Button>
      </div>
    </div>
  )
}

export default Modal
