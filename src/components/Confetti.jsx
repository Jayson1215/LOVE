import { useEffect, useRef } from 'react'

function Confetti() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const particles = []

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticles = (x = canvas.width / 2, y = canvas.height / 2) => {
      for (let i = 0; i < 60; i++) {
        particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 12,
          vy: (Math.random() - 0.5) * 12 - 5,
          life: 1,
          decay: Math.random() * 0.015 + 0.015,
          color: ['#FF1493', '#FFB6C1', '#FF69B4', '#FFC0CB', '#FF6B9D', '#FF69B4'][
            Math.floor(Math.random() * 6)
          ],
          size: Math.random() * 5 + 3,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 15,
        })
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]

        p.x += p.vx
        p.y += p.vy
        p.vy += 0.2
        p.life -= p.decay
        p.rotation += p.rotationSpeed

        ctx.globalAlpha = p.life
        ctx.fillStyle = p.color
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotation * Math.PI) / 180)

        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size)
        ctx.restore()

        if (p.life <= 0) {
          particles.splice(i, 1)
        }
      }

      ctx.globalAlpha = 1

      if (particles.length > 0) {
        requestAnimationFrame(animate)
      }
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Burst confetti multiple times
    createParticles()
    setTimeout(() => createParticles(), 200)
    setTimeout(() => createParticles(), 400)

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1000,
      }}
    />
  )
}

export default Confetti
