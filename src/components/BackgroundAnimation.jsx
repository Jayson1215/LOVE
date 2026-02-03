import { motion } from 'framer-motion'
import './BackgroundAnimation.css'

function BackgroundAnimation() {
  const floatingShapes = Array.from({ length: 8 }, (_, i) => i)

  const shapeVariants = {
    animate: {
      y: [0, -20, 0],
      x: [0, 10, 0],
      rotate: [0, 360, 0],
      opacity: [0.3, 0.6, 0.3],
    },
  }

  return (
    <div className="background-animation">
      {floatingShapes.map((index) => (
        <motion.div
          key={index}
          className="floating-shape"
          variants={shapeVariants}
          animate="animate"
          transition={{
            duration: 8 + index * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: index * 0.3,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            size: `${30 + index * 10}px`,
          }}
        >
          <div className="shape" />
        </motion.div>
      ))}

      <motion.div
        className="glow-orb orb-1"
        animate={{
          x: [0, 50, -30, 0],
          y: [0, 30, -50, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="glow-orb orb-2"
        animate={{
          x: [0, -40, 30, 0],
          y: [0, -40, 30, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />

      <motion.div
        className="glow-orb orb-3"
        animate={{
          x: [0, 30, -50, 0],
          y: [0, -30, 40, 0],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />
    </div>
  )
}

export default BackgroundAnimation
