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

export const editItemType = (id, index, type) => ({
  type: 'EDIT_ITEM_TYPE',
  id,
  index,
  type
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

export const updatResultItems = (items) => ({
  type: 'UPDATE_PREDICT_ITEMS',
  items
})

export const moveParticles = (time) => ({
  type: 'MOVE_PARTICLES',
  time
})