import { motion } from 'framer-motion'
import './EnvelopeSurprise.css'

function EnvelopeSurprise({ onOpen }) {
  const envelopeVariants = {
    idle: {
      rotateZ: 0,
      y: 0,
    },
    hover: {
      rotateZ: -2,
      y: -10,
    },
  }

  const flapVariants = {
    closed: {
      rotateX: 0,
    },
    open: {
      rotateX: -180,
      transition: {
        duration: 0.8,
        ease: 'easeInOut',
      },
    },
  }

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateZ: 5,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateZ: 0,
      transition: {
        delay: 0.6,
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  return (
    <div className="envelope-container">
      {/* Animated Pink Petals - Left Side */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="animated-petal"
          animate={{
            y: [0, -30, 0],
            x: [0, Math.sin(i * Math.PI / 2.5) * 40, 0],
            rotate: [0, 360, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 4 + i * 0.3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.2,
          }}
          style={{
            top: `${10 + i * 15}%`,
            left: `${5 + i * 18}%`,
          }}
        >
          <div className="petal" />
        </motion.div>
      ))}

      {/* Animated Pink Petals - Right Side */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={`right-${i}`}
          className="animated-petal-right"
          animate={{
            y: [0, 40, 0],
            x: [0, -Math.cos(i * Math.PI / 2) * 30, 0],
            rotate: [-360, 0, -360],
            opacity: [0.5, 0.9, 0.5],
          }}
          transition={{
            duration: 5 + i * 0.4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.3,
          }}
          style={{
            top: `${15 + i * 20}%`,
            right: `${3 + i * 20}%`,
          }}
        >
          <div className="petal" />
        </motion.div>
      ))}

      <motion.div
        className="envelope"
        variants={envelopeVariants}
        initial="idle"
        whileHover="hover"
        onClick={onOpen}
      >
        {/* Back flap (bottom) */}
        <motion.div className="envelope-back" />

        {/* Front envelope body */}
        <motion.div className="envelope-body">
          {/* Flap top */}
          <motion.div
            className="flap-top"
            variants={flapVariants}
            initial="closed"
            whileHover="open"
            onClick={(e) => {
              e.stopPropagation()
              onOpen()
            }}
            style={{
              transformOrigin: 'top',
              transformStyle: 'preserve-3d',
            }}
          >
            <div className="flap-inner" />
          </motion.div>

          {/* Letter inside */}
          <motion.div
            className="letter"
            variants={letterVariants}
            initial="hidden"
            whileHover="visible"
          >
            <div className="letter-content">
              <div className="heart-decoration">💕</div>
              <p className="letter-text">Open Me!</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Click instruction */}
        <motion.div
          className="click-hint"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Click to Open 💌
        </motion.div>
      </motion.div>

      {/* Decorative particles */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="floating-particle"
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.4,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: '50%',
          }}
        >
          ✨
        </motion.div>
      ))}
    </div>
  )
}

export default EnvelopeSurprise
