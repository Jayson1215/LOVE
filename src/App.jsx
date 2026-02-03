import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BackgroundAnimation from './components/BackgroundAnimation'
import EnvelopeSurprise from './components/EnvelopeSurprise'
import SnakeGame from './components/SnakeGame'
import ValentineCard from './components/ValentineCard'
import ResponseModal from './components/ResponseModal'
import ThankYouModal from './components/ThankYouModal'
import Confetti from './components/Confetti'
import './App.css'

function App() {
  const [envelopeOpened, setEnvelopeOpened] = useState(false)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [responded, setResponded] = useState(false)
  const [answer, setAnswer] = useState(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)

  const handleYes = () => {
    setAnswer('yes')
    setResponded(true)
    setShowConfetti(true)
  }

  const handleNo = () => {
    setAnswer('no')
    setResponded(true)
  }

  const handleCelebrate = () => {
    setShowThankYou(true)
  }

  const handleReset = () => {
    setResponded(false)
    setAnswer(null)
    setShowConfetti(false)
    setShowThankYou(false)
    setEnvelopeOpened(false)
    setGameCompleted(false)
  }

  return (
    <div className="app-container">
      <BackgroundAnimation />
      
      {showConfetti && <Confetti />}

      <AnimatePresence mode="wait">
        {showThankYou ? (
          <motion.div
            key="thankyou"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <ThankYouModal onReset={handleReset} />
          </motion.div>
        ) : !envelopeOpened ? (
          <motion.div
            key="envelope"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <EnvelopeSurprise onOpen={() => setEnvelopeOpened(true)} />
          </motion.div>
        ) : !gameCompleted ? (
          <motion.div
            key="game"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <SnakeGame onComplete={() => setGameCompleted(true)} />
          </motion.div>
        ) : !responded ? (
          <motion.div
            key="card"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <ValentineCard onYes={handleYes} onNo={handleNo} />
          </motion.div>
        ) : (
          <motion.div
            key="response"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <ResponseModal answer={answer} onReset={handleReset} onCelebrate={handleCelebrate} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
