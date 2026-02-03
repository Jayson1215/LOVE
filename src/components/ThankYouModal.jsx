import { motion } from 'framer-motion'
import './ThankYouModal.css'

function ThankYouModal({ onReset }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  return (
    <motion.div
      className="thankyou-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="thankyou-card" variants={itemVariants}>
        {/* Floating hearts background */}
        <div className="floating-hearts-bg">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              className="bg-heart"
              animate={{
                y: [0, -100, -200],
                opacity: [1, 0.5, 0],
              }}
              transition={{
                duration: 4 + i * 0.3,
                repeat: Infinity,
                ease: 'easeOut',
                delay: i * 0.3,
              }}
            >
              💕
            </motion.div>
          ))}
        </div>

        <motion.div className="thankyou-content" variants={itemVariants}>
          <motion.div
            className="thankyou-emoji"
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            💖
          </motion.div>

          <motion.h1 className="thankyou-title" variants={itemVariants}>
            Thank You!
          </motion.h1>

          <motion.p className="thankyou-message" variants={itemVariants}>
            Happy Valentine's Day, Margaux Jane! 🌹
          </motion.p>

          <motion.div className="love-declaration" variants={itemVariants}>
            <p className="declaration-text">
              I love you sooo much 💞
            </p>
          </motion.div>

          <motion.p className="signature" variants={itemVariants}>
            - Jayson Velasco 💕
          </motion.p>

          <motion.div className="hearts-animation" variants={itemVariants}>
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.span
                key={i}
                className="floating-heart-anim"
                animate={{ y: [0, -20, 0], opacity: [1, 1, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.15,
                }}
              >
                💗
              </motion.span>
            ))}
          </motion.div>

          <motion.button
            className="reset-button"
            onClick={onReset}
            variants={itemVariants}
            whileHover={{ scale: 1.08, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Over ✨
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Decorative elements */}
      <motion.div className="decorative-roses">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="rose"
            animate={{
              rotate: 360,
              y: [0, -30, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            🌹
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default ThankYouModal
