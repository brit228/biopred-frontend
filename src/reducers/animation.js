function generateParticles({num, width, height, timex, timey, dw, dh, dtx, dty}) {
  const particles = new Array(num)
  for (var i = 0; i < num; i++) {
    const xMin = (Math.random() - 0.5) * dw + dw
    const xMax = (Math.random() - 0.5) * dw + width - dw
    const yMin = (Math.random() - 0.5) * dh + dh
    const yMax = (Math.random() - 0.5) * dh + height - dh
    const xTime = (Math.random() - 0.5) * dtx + timex
    const yTime = (Math.random() - 0.5) * dty + timey
    const xPhase = Math.random() * xTime
    const yPhase = Math.random() * yTime
    const rot1 = (2.0*Math.random()-1.0) * 0.001
    const rot2 = (2.0*Math.random()-1.0) * 0.002
    const rad = 4*(Math.random() * 0.5 + 0.3)
    particles[i] = {
      color: "none",
      size: rad,
      x: (xMax - xMin) * Math.sin(xPhase) + (xMin + xMax) / 2.0,
      y: (yMax - yMin) * Math.sin(yPhase) + (yMin + yMax) / 2.0,
      time: 10000.0,
      xAmp: xMax - xMin,
      yAmp: yMax - yMin,
      xPer: xTime,
      yPer: yTime,
      xPha: xPhase,
      yPha: yPhase,
      xInt: (xMin + xMax) / 2.0,
      yInt: (yMin + yMax) / 2.0,
      rot1: rot1,
      rot2: rot2,
      arcX1: rad * Math.cos(rot1 * 10000.0) + (xMax - xMin) * Math.sin(xPhase) + (xMin + xMax) / 2.0,
      arcY1: rad * Math.sin(rot1 * 10000.0) + (yMax - yMin) * Math.sin(yPhase) + (yMin + yMax) / 2.0,
      arcX2: rad * (Math.cos(rot2 * 10000.0) - Math.cos(rot1 * 10000.0)),
      arcY2: rad * (Math.sin(rot2 * 10000.0) - Math.sin(rot1 * 10000.0)),
      flip: 0,
      big: 0
    }
  }
  return particles
}

function currPositionX({ particle, time }) {
  return particle.xAmp * Math.sin(particle.xPer * time + particle.xPha) + particle.xInt
}

function currPositionY({ particle, time }) {
  return particle.yAmp * Math.sin(particle.yPer * time + particle.yPha) + particle.yInt
}

function currArcX1({ particle, time }) {
  return particle.size * Math.cos(particle.rot1 * time) + currPositionX({ particle, time })
}

function currArcY1({ particle, time }) {
  return particle.size * Math.sin(particle.rot1 * time) + currPositionY({ particle, time })
}

function currArcX2({ particle, time }) {
  return particle.size * Math.cos(particle.rot2 * time) + currPositionX({ particle, time })
}

function currArcY2({ particle, time }) {
  return particle.size * Math.sin(particle.rot2 * time) + currPositionY({ particle, time })
}

function currBig({ particle, time }) {
  return Math.sin((particle.rot1 * time - particle.rot2 * time))*Math.sin(0.5*(particle.rot1 * time - particle.rot2 * time)) < 0.0 ? 1 : 0
}

function currFlip({ particle, time }) {
  return Math.sin((particle.rot1 * time - particle.rot2 * time))*Math.cos(0.5*(particle.rot1 * time - particle.rot2 * time)) < 0.0 ? 1 : 0
}

const initalState = generateParticles({
  num: 10,
  width: 100.0,
  height: 100.0,
  timex: 0.00001,
  timey: 0.000001,
  dw: 80.0,
  dh: 80.0,
  dtx: 0.0003,
  dty: 0.0003
})

const particles = (state = initalState, action) => {
  switch (action.type) {
    case 'MOVE_PARTICLES':
      return Object.assign([], state, state.map((particle, index) => {
        return Object.assign({}, particle, { 
          x: currPositionX({ particle, time: particle.time + action.time }),
          y: currPositionY({ particle, time: particle.time + action.time }),
          arcX1: currArcX1({ particle, time: particle.time + action.time }),
          arcY1: currArcY1({ particle, time: particle.time + action.time }),
          arcX2: currArcX2({ particle, time: particle.time + action.time }),
          arcY2: currArcY2({ particle, time: particle.time + action.time }),
          big: currBig({ particle, time: particle.time + action.time }),
          flip: currFlip({ particle, time: particle.time + action.time }),
          time: particle.time + action.time
        })
      }))
    default:
      return state
  }
}

export default particles