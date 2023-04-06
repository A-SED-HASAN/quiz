import axios from 'axios'
import React, { useState, useContext } from 'react'

const table = [
  {
    id: 9,
    name: 'General Knowledge',
  },
  {
    id: 10,
    name: 'Entertainment - Books',
  },
  {
    id: 11,
    name: 'Entertainment - Film',
  },
  {
    id: 12,
    name: 'Entertainment - Music',
  },
  {
    id: 13,
    name: 'Entertainment - Musicals & Theatres',
  },
  {
    id: 14,
    name: 'Entertainment - Television',
  },
  {
    id: 15,
    name: 'Entertainment - Video Games',
  },
  {
    id: 16,
    name: 'Entertainment - Board Games',
  },
  {
    id: 17,
    name: 'Science & Nature',
  },
  {
    id: 18,
    name: 'Science - Computers',
  },
  {
    id: 19,
    name: 'Science - Mathematics',
  },
  {
    id: 20,
    name: 'Mythology',
  },
  {
    id: 21,
    name: 'Sports',
  },
  {
    id: 22,
    name: 'Geography',
  },
  {
    id: 23,
    name: 'History',
  },
  {
    id: 24,
    name: 'Politics',
  },
  {
    id: 25,
    name: 'Art',
  },
  {
    id: 26,
    name: 'Celebrities',
  },
  {
    id: 27,
    name: 'Animals',
  },
  {
    id: 28,
    name: 'Vehicles',
  },
  {
    id: 29,
    name: 'Entertainment - Comics',
  },
  {
    id: 30,
    name: 'Science - Gadgets',
  },
  {
    id: 31,
    name: 'Entertainment - Japanese Anime & Manga',
  },
  {
    id: 32,
    name: 'Entertainment - Cartoon & Animations',
  },
].sort(() => 0.5 - Math.random())

const API_ENDPOINT = 'https://opentdb.com/api.php?'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState('light')
  const [waiting, setWaiting] = useState(true)
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState([])
  const [index, setIndex] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [error, setError] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: 21,
    difficulty: 'easy',
    trueFalse: false,
  })

  const fetchQuestions = async (url) => {
    setLoading(true)
    setWaiting(false)

    const response = await axios.get(url).catch((err) => console.log(err))

    if (response) {
      const data = response.data.results
      if (data.length > 0) {
        setQuestions(data)
        setLoading(false)
        setWaiting(false)
        setError(false)
      } else {
        setError(true)
        setWaiting(true)
      }
    } else {
      setWaiting(true)
    }
  }

  const nextQuestion = () => {
    setIndex((oldIndex) => {
      const index = oldIndex + 1
      if (index > questions.length - 1) {
        openModal()
        return 0
      } else {
        return index
      }
    })
  }

  const checkAnswer = (value) => {
    if (value) {
      setCorrect((oldState) => oldState + 1)
    }
    nextQuestion()
  }

  const openModal = () => {
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setWaiting(true)
    setCorrect(0)
    setIsModalOpen(false)
    setQuiz({
      amount: 10,
      category: 21,
      difficulty: 'easy',
      trueFalse: false,
    })
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setQuiz({ ...quiz, [name]: value })
    if (name === 'trueFalse') {
      setQuiz({ ...quiz, [name]: e.target.checked })
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const { amount, category, difficulty, trueFalse } = quiz
    let url = `${API_ENDPOINT}amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`
    if (trueFalse) {
      url = `${API_ENDPOINT}amount=${amount}&category=${category}&difficulty=${difficulty}&type=boolean`
    }
    fetchQuestions(url)
  }
  const themeToggler = () => {
    if (theme === 'light') {
      setTheme('dark')

      document.documentElement.classList.add('dark')
    } else {
      setTheme('light')

      document.documentElement.classList.remove('dark')
    }
  }
  return (
    <AppContext.Provider
      value={{
        waiting,
        loading,
        questions,
        index,
        correct,
        error,
        isModalOpen,
        nextQuestion,
        checkAnswer,
        closeModal,
        handleChange,
        handleSubmit,
        quiz,
        table,
        theme,
        themeToggler,
      }}>
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
