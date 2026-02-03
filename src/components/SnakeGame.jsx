import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import './SnakeGame.css'

function SnakeGame({ onComplete }) {
  const canvasRef = useRef(null)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [snake, setSnake] = useState([{ x: 10, y: 10 }])
  const [apple, setApple] = useState({ x: 15, y: 15 })
  const [direction, setDirection] = useState({ x: 1, y: 0 })
  const [nextDirection, setNextDirection] = useState({ x: 1, y: 0 })
  const gameLoopRef = useRef(null)

  const gridSize = 20
  const tileCount = 20

  // Generate random apple position
  const generateApple = () => {
    return {
      x: Math.floor(Math.random() * tileCount),
      y: Math.floor(Math.random() * tileCount),
    }
  }

  // Game loop
  useEffect(() => {
    if (gameOver || score >= 5) return

    gameLoopRef.current = setInterval(() => {
      setSnake((prevSnake) => {
        const newSnake = [...prevSnake]
        const head = { ...newSnake[0] }

        // Move head
        head.x += nextDirection.x
        head.y += nextDirection.y

        // Wrap around
        head.x = (head.x + tileCount) % tileCount
        head.y = (head.y + tileCount) % tileCount

        // Check collision with self
        if (newSnake.some((segment) => segment.x === head.x && segment.y === head.y)) {
          setGameOver(true)
          return prevSnake
        }

        newSnake.unshift(head)

        // Check collision with apple
        if (head.x === apple.x && head.y === apple.y) {
          const newScore = score + 1
          setScore(newScore)

          if (newScore >= 5) {
            setGameOver(true)
          } else {
            setApple(generateApple())
          }
        } else {
          newSnake.pop()
        }

        setDirection(nextDirection)
        return newSnake
      })
    }, 100)

    return () => clearInterval(gameLoopRef.current)
  }, [apple, gameOver, score, nextDirection])

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault()
          if (direction.y === 0) setNextDirection({ x: 0, y: -1 })
          break
        case 'ArrowDown':
          e.preventDefault()
          if (direction.y === 0) setNextDirection({ x: 0, y: 1 })
          break
        case 'ArrowLeft':
          e.preventDefault()
          if (direction.x === 0) setNextDirection({ x: -1, y: 0 })
          break
        case 'ArrowRight':
          e.preventDefault()
          if (direction.x === 0) setNextDirection({ x: 1, y: 0 })
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [direction])

  // Draw game
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const tileSize = canvas.width / tileCount

    // Clear canvas
    ctx.fillStyle = '#fff5f5'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw grid
    ctx.strokeStyle = '#ffe0e0'
    ctx.lineWidth = 0.5
    for (let i = 0; i <= tileCount; i++) {
      ctx.beginPath()
      ctx.moveTo(i * tileSize, 0)
      ctx.lineTo(i * tileSize, canvas.height)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(0, i * tileSize)
      ctx.lineTo(canvas.width, i * tileSize)
      ctx.stroke()
    }

    // Draw snake
    snake.forEach((segment, index) => {
      const gradient = ctx.createLinearGradient(
        segment.x * tileSize,
        segment.y * tileSize,
        (segment.x + 1) * tileSize,
        (segment.y + 1) * tileSize
      )

      if (index === 0) {
        gradient.addColorStop(0, '#dc143c')
        gradient.addColorStop(1, '#8b0000')
        ctx.fillStyle = gradient
      } else {
        gradient.addColorStop(0, '#ff6b9d')
        gradient.addColorStop(1, '#dc143c')
        ctx.fillStyle = gradient
      }

      ctx.fillRect(
        segment.x * tileSize + 1,
        segment.y * tileSize + 1,
        tileSize - 2,
        tileSize - 2
      )

      // Draw eyes on head
      if (index === 0) {
        ctx.fillStyle = 'white'
        const eyeSize = tileSize / 6
        const eyeOffset = tileSize / 3

        ctx.beginPath()
        ctx.arc(
          (segment.x + 0.35) * tileSize,
          (segment.y + 0.35) * tileSize,
          eyeSize,
          0,
          Math.PI * 2
        )
        ctx.fill()

        ctx.beginPath()
        ctx.arc(
          (segment.x + 0.65) * tileSize,
          (segment.y + 0.35) * tileSize,
          eyeSize,
          0,
          Math.PI * 2
        )
        ctx.fill()
      }
    })

    // Draw apple
    ctx.fillStyle = '#FFD700'
    ctx.beginPath()
    ctx.arc(
      (apple.x + 0.5) * tileSize,
      (apple.y + 0.5) * tileSize,
      tileSize / 2.5,
      0,
      Math.PI * 2
    )
    ctx.fill()

    // Draw apple shine
    ctx.fillStyle = '#FFFF99'
    ctx.beginPath()
    ctx.arc(
      (apple.x + 0.3) * tileSize,
      (apple.y + 0.3) * tileSize,
      tileSize / 6,
      0,
      Math.PI * 2
    )
    ctx.fill()
  }, [snake, apple])

  const handleRestart = () => {
    setSnake([{ x: 10, y: 10 }])
    setApple({ x: 15, y: 15 })
    setDirection({ x: 1, y: 0 })
    setNextDirection({ x: 1, y: 0 })
    setScore(0)
    setGameOver(false)
  }

  const handleArrowClick = (directionType) => {
    switch (directionType) {
      case 'up':
        if (direction.y === 0) setNextDirection({ x: 0, y: -1 })
        break
      case 'down':
        if (direction.y === 0) setNextDirection({ x: 0, y: 1 })
        break
      case 'left':
        if (direction.x === 0) setNextDirection({ x: -1, y: 0 })
        break
      case 'right':
        if (direction.x === 0) setNextDirection({ x: 1, y: 0 })
        break
      default:
        break
    }
  }

  return (
    <div className="snake-game-container">
      <motion.div
        className="game-wrapper"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="game-title">🎮 Eat The Apples! 🍎</h2>
        
        <div className="game-info">
          <div className="score-box">
            <p className="score-label">Apples Eaten:</p>
            <p className="score-number">{score}/5</p>
          </div>
          <div className="progress-bar">
            <motion.div
              className="progress-fill"
              initial={{ width: '0%' }}
              animate={{ width: `${(score / 5) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <div className="canvas-wrapper">
          <canvas
            ref={canvasRef}
            width={400}
            height={400}
            className="game-canvas"
          />
        </div>

        <div className="controls">
          <p className="control-text">Use Arrow Keys or Buttons to Move</p>
          <div className="arrow-keys">
            <div className="arrow-row">
              <button className="arrow-btn" onClick={() => handleArrowClick('up')}>↑</button>
            </div>
            <div className="arrow-row">
              <button className="arrow-btn" onClick={() => handleArrowClick('left')}>←</button>
              <button className="arrow-btn" onClick={() => handleArrowClick('down')}>↓</button>
              <button className="arrow-btn" onClick={() => handleArrowClick('right')}>→</button>
            </div>
          </div>
        </div>

        {gameOver && score < 5 && (
          <motion.div
            className="game-over-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="modal-content">
              <p className="modal-title">Oh No! 😅</p>
              <p className="modal-text">You got {score}/5 apples. Try again!</p>
              <button className="modal-btn" onClick={handleRestart}>
                Try Again 🔄
              </button>
            </div>
          </motion.div>
        )}

        {score >= 5 && (
          <motion.div
            className="success-modal"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="modal-content success">
              <motion.p
                className="modal-title"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                🎉 You Won! 🎉
              </motion.p>
              <p className="modal-text">You ate all 5 apples! Ready for your surprise?</p>
              <button className="modal-btn success-btn" onClick={onComplete}>
                Open My Letter 💌
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default SnakeGame
