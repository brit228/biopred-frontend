export const moveParticles = (time) => ({
  type: 'MOVE_PARTICLES',
  time
})

export const hideUI = () => ({
  type: "HIDE_UI"
})

export const showUI = () => ({
  type: "SHOW_UI"
})

export const userCompleted = (limit) => ({
  type: "USER_COMPLETE",
  limit
})

export const userCompletedCancel = () => ({
  type: "USER_NOT_COMPLETE"
})

export const checkUserCompleted = () => ({
  type: "CHECK_USER_COMPLETE"
})