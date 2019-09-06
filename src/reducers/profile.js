const initialState = {
  showUI: false,
  userComplete: false,
  checkUserComplete: false,
  limit: 0
}

const profile = (state=initialState, action) => {
  switch (action.type) {
    case 'SHOW_UI':
      return Object.assign({}, state, {
        showUI: true
      })
    case 'HIDE_UI':
      return Object.assign({}, state, {
        showUI: false
      })
    case "USER_COMPLETE":
      return Object.assign({}, state, {
        userComplete: true,
        limit: action.limit
      })
    case "USER_NOT_COMPLETE":
      return Object.assign({}, state, {
        userComplete: false
      })
    case "CHECK_USER_COMPLETE":
      return Object.assign({}, state, {
        checkUserComplete: true
      })
    case "CHECK_USER_NOT_COMPLETE":
      return Object.assign({}, state, {
        checkUserComplete: false
      })
    default:
      return state
  }
}

export default profile