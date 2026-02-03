import { motion } from 'framer-motion'
import './ResponseModal.css'

function ResponseModal({ answer, onReset, onCelebrate }) {
  const isYes = answer === 'yes'

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
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  return (
    <motion.div
      className={`response-card ${isYes ? 'yes-response' : 'no-response'}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="response-content" variants={itemVariants}>
        {isYes ? (
          <>
            <motion.div
              className="emoji-large"
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              🎉
            </motion.div>

            <motion.h1 className="response-heading yes-heading" variants={itemVariants}>
              You Made Me The Happiest Person! 💕
            </motion.h1>

            <motion.p className="response-text" variants={itemVariants}>
              I'm so excited to celebrate Valentine's Day with you, Margaux Jane! This will be a day I'll never forget.
            </motion.p>

            <motion.div className="hearts-row" variants={itemVariants}>
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.span
                  key={i}
                  className="floating-heart"
                  animate={{ y: [0, -15, 0], opacity: [1, 1, 1] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.15,
                  }}
                >
                  💗
                </motion.span>
              ))}
            </motion.div>

            <motion.div className="celebration-box" variants={itemVariants}>
              <p className="celebration-text-main">💐 Let's make this Valentine's Day unforgettable 🌹</p>
              <p className="celebration-text-date">📅 February 14, 2026</p>
            </motion.div>

            <motion.div className="love-message" variants={itemVariants}>
              <p className="love-text">I can't wait to spend this special day with you!</p>
            </motion.div>
          </>
        ) : (
          <>
            <motion.div
              className="emoji-large"
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              😔
            </motion.div>

            <motion.h1 className="response-heading no-heading" variants={itemVariants}>
              Are You Sure? 💔
            </motion.h1>

            <motion.p className="response-text" variants={itemVariants}>
              I believe in giving second chances. Maybe you'll reconsider?
            </motion.p>

            <motion.p
              className="response-text hopeful"
              variants={itemVariants}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              I'll be here, waiting for a "Yes..." 💝
            </motion.p>
          </>
        )}

        <motion.button
          className={`action-button ${isYes ? 'yes-button' : 'no-button'}`}
          onClick={isYes ? onCelebrate : onReset}
          variants={itemVariants}
          whileHover={{ scale: 1.08, y: -3 }}
          whileTap={{ scale: 0.95 }}
        >
          {isYes ? '🎊 Celebrate More!' : '🔄 Try Again'}
        </motion.button>
      </motion.div>

      {isYes && (
        <motion.div className="decorative-elements">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="floating-element"
              animate={{
                y: [0, -50, 0],
                x: [0, Math.sin(i) * 30, 0],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            >
              ✨
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}

export default ResponseModal
