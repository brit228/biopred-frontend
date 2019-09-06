export const addItem = () => ({
  type: 'ADD_ITEM'
})

export const removeItem = (id) => ({
  type: 'REMOVE_ITEM',
  id
})

export const editItemText = (id, index, text) => ({
  type: 'EDIT_ITEM_TEXT',
  id,
  index,
  text
})

export const editItemSequence = (id, index, text) => ({
  type: 'EDIT_ITEM_SEQUENCE',
  id,
  index,
  text
})

export const editItemType = (id, index, typ) => ({
  type: 'EDIT_ITEM_TYPE',
  id,
  index,
  typ
})

export const editItemMolecule = (id, index, typ) => ({
  type: 'EDIT_ITEM_MOLECULE',
  id,
  index,
  typ
})

export const editItemPrediction = (id, pred) => ({
  type: 'EDIT_ITEM_PREDICTION',
  id,
  pred
})

export const searchItem = (input, index) => ({
  type: 'SEARCH_ITEM',
  input,
  index
})

export const predictItems = () => ({
  type: 'PREDICT_ITEMS'
})

export const predictItem = (id) => ({
  type: 'PREDICT_ITEM',
  id
})

export const predictItemsJob = () => ({
  type: 'PREDICT_ITEMS_JOB',
  jobid
})

export const predictItemJob = (id, jobid) => ({
  type: 'PREDICT_ITEM_JOB',
  id,
  jobid
})

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