import { useState } from 'react'
import { motion } from 'framer-motion'
import './ValentineCard.css'

function ValentineCard({ onYes, onNo }) {
  const [noCount, setNoCount] = useState(0)
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }

  const buttonVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.08 },
    tap: { scale: 0.92 },
  }

  const handleNo = () => {
    const newCount = noCount + 1
    setNoCount(newCount)
    onNo()
  }

  const yesButtonScale = 1 + noCount * 0.15
  const funMessages = [
    "Come on, give it a thought!",
    "Really? Think about it... 💭",
    "I'm sure you'll change your mind! 😉",
    "The Yes button is getting desperate! 😄",
    "ONE MORE TIME! The Yes button is HUGE now! 🚀"
  ]

  const funMessage = noCount > 0 && noCount <= 5 ? funMessages[Math.min(noCount - 1, 4)] : null

  return (
    <motion.div
      className="valentine-card"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="card-content" variants={itemVariants}>
        <motion.h1
          className="main-title"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          💕
        </motion.h1>

        <motion.h2 className="greeting" variants={itemVariants}>
          Hello, Margaux Jane!
        </motion.h2>

        <motion.div className="message-box" variants={itemVariants}>
          <p className="message">
            As Valentine's Day approaches, I want to express something special to you.
          </p>
        </motion.div>

        <motion.div className="question-container" variants={itemVariants}>
          <h3 className="question">Will You Be My Valentine?</h3>
          <p className="subtext">February 14, 2026</p>
          {funMessage && (
            <motion.p 
              className="fun-message"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.5 }}
              key={noCount}
            >
              {funMessage}
            </motion.p>
          )}
        </motion.div>

        <motion.div
          className="button-group"
          variants={itemVariants}
          style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}
        >
          <motion.button
            className="btn btn-yes"
            onClick={onYes}
            variants={buttonVariants}
            initial="idle"
            whileHover="hover"
            whileTap="tap"
            animate={{ scale: yesButtonScale }}
            transition={{ type: 'spring', stiffness: 300 }}
            style={{ 
              fontSize: `${1.1 + noCount * 0.15}rem`,
              padding: `${16 + noCount * 4}px ${40 + noCount * 10}px`
            }}
          >
            <span className="btn-text">Yes! 💗</span>
          </motion.button>

          <motion.button
            className="btn btn-no"
            onClick={handleNo}
            variants={buttonVariants}
            initial="idle"
            whileHover="hover"
            whileTap="tap"
          >
            <span className="btn-text">No 😔</span>
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div
        className="card-decoration"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <div className="decoration-dot" />
      </motion.div>
    </motion.div>
  )
}

export default ValentineCard
