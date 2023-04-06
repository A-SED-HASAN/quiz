import React from 'react'
import { useGlobalContext } from '../context/context'
import { Button, Checkbox, IconButton, Alert } from '@mui/material'
import NightlightIcon from '@mui/icons-material/Nightlight'
import Brightness7Icon from '@mui/icons-material/Brightness7'

const SetupForm = () => {
  const {
    quiz,
    handleChange,
    handleSubmit,
    error,
    table,
    theme,
    themeToggler,
  } = useGlobalContext()
  return (
    <main>
      <IconButton className='dark-mode-btn' size='large' onClick={themeToggler}>
        {theme === 'light' ? <NightlightIcon /> : <Brightness7Icon />}
      </IconButton>
      <div className='quiz quiz-small'>
        <form className='setup-form'>
          <h2>setup quiz</h2>
          {/* amount */}
          <div className='form-control'>
            <label htmlFor='amount'> number of question</label>
            <input
              className='form-input'
              min={1}
              max={50}
              type='text'
              name='amount'
              id='amount'
              value={quiz.amount}
              onChange={handleChange}
            />
          </div>
          {/* category */}
          <div className='form-control'>
            <label htmlFor='category'> category</label>
            <select
              className='form-input'
              name='category'
              id='category'
              value={quiz.category}
              onChange={handleChange}>
              {table.map((item, index) => {
                return (
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                )
              })}
            </select>
          </div>

          {/* difficulty */}
          <div className='form-control'>
            <label htmlFor='difficulty'>select difficulty</label>
            <select
              className='form-input'
              name='difficulty'
              id='difficulty'
              value={quiz.difficulty}
              onChange={handleChange}>
              <option value='easy'>easy</option>
              <option value='medium'>medium</option>
              <option value='hard'>hard</option>
            </select>
          </div>

          {/* true false */}
          <div className='form-control true-false'>
            <label htmlFor='true-false'>true/false</label>
            <Checkbox
              onChange={handleChange}
              value={quiz.trueFalse}
              name='trueFalse'
            />
          </div>

          {error && (
            <Alert variant='outlined' className='error' severity='error'>
              cant generate . please try different options
            </Alert>
          )}
          <Button onClick={handleSubmit} className='submit-btn' type='submit'>
            start
          </Button>
        </form>
      </div>
    </main>
  )
}

export default SetupForm
