import React from 'react'

const ParticleSVG = ({ size, x, y, arcX1, arcY1, arcX2, arcY2, big, flip }) => {
  return (
    [
      <circle cx={x} cy={y} r={size/3.0} fill='black' fillOpacity='1.0' />,
      <path d={"M "+arcX1+" "+arcY1+" A "+size+" "+size+" 0 "+big+" "+flip+" "+arcX2+" "+arcY2} stroke="black" fillOpacity={0.0} />
    ]
  )
}

const BackgroundAnimation = ({ particles, moveParticles }) => {
  const startTime = Date.now()
  return (
    <svg style={{width:'100vw', height:'100vh', position:'fixed', bottom:0, left:0, zIndex:-100}} viewBox="0 0 100 100">
      {
        particles.map((p1, ind1) => (
          particles.slice(ind1+1).map((p2, ind2) => (
            ind1 === ind2 ? null : <line x1={p1.x} x2={p2.x} y1={p1.y} y2={p2.y} stroke="black" strokeWidth={0.1} />
          ))
        ))
      }
      {
        particles.map((particle, index) => (
          <ParticleSVG key={index} color={particle.color} size={particle.size} x={particle.x} y={particle.y}
            arcX1={particle.arcX1} arcY1={particle.arcY1} arcX2={particle.arcX2} arcY2={particle.arcY2} big={particle.big} flip={particle.flip} />
        ))
      }
      {
        setTimeout(
          () => {moveParticles(Date.now() - startTime)},
          10
        )
      }
    </svg>
  )
}

export default BackgroundAnimation