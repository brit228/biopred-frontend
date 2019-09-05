const initalState = [
  {
    item1: {
      sequence: '',
      text: '',
      input_type: 'PROTEIN',
      search_type: 'SEQUENCE'
    },
    item2: {
      sequence: '',
      text: '',
      input_type: 'PROTEIN',
      search_type: 'SEQUENCE'
    },
    prediction: {
      item1: {checked: false},
      item2: {checked: false}
    },
    state: 'ready'
  }
]

const items = (state=initalState, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return [
        ...state,
        ...initalState
      ]
    case 'EDIT_ITEM_TYPE':
      return state.map((item, index) => {
        if (index === action.id) {
          if (action.index===0) {
            var dval ={
              search_type: action.typ
            }
            if (item.item1.search_type === 'ALL') {
              dval.sequence = ''
              dval.text = ''
            }
            return Object.assign({}, item, {
              item1: Object.assign({}, item.item1, dval)
            })
          } else {
            var dval ={
              search_type: action.typ
            }
            if (item.item2.search_type === 'ALL') {
              dval.sequence = ''
              dval.text = ''
            }
            return Object.assign({}, item, {
              item2: Object.assign({}, item.item2, dval)
            })
          }
        } else {
          return item
        }
      })
    case 'EDIT_ITEM_MOLECULE':
      return state.map((item, index) => {
        if (index === action.id) {
          if (action.index===0) {
            return Object.assign({}, item, {
              item1: Object.assign({}, item.item1, {
                input_type: action.typ,
                search_type: (action.typ === 'LIGAND' && item.item1.search_type !== 'ALL' ? 'SEQUENCE' : item.item1.search_type)
              })
            })
          } else {
            return Object.assign({}, item, {
              item2: Object.assign({}, item.item2, {
                input_type: action.typ,
                search_type: (action.typ === 'LIGAND' && item.item2.search_type !== 'ALL' ? 'SEQUENCE' : item.item2.search_type)
              })
            })
          }
        } else {
          return item
        }
      })
    case 'EDIT_ITEM_TEXT':
      return state.map((item, index) => {
        if (index === action.id) {
          if (action.index===0) {
            var dval = {
              text: action.text
            }
            if (item.item1.search_type === 'SEQUENCE') {
              dval.sequence = action.text
            } else {
              dval.sequence = ''
            }
            return Object.assign({}, item, {
              item1: Object.assign({}, item.item1, dval)
            })
          } else {
            var dval = {
              text: action.text
            }
            if (item.item2.search_type === 'SEQUENCE') {
              dval.sequence = action.text
            } else {
              dval.sequence = ''
            }
            return Object.assign({}, item, {
              item2: Object.assign({}, item.item2, dval)
            })
          }
        } else {
          return item
        }
      })
    case 'EDIT_ITEM_SEQUENCE':
      return state.map((item, index) => {
        if (index === action.id) {
          if (action.index===0) {
            return Object.assign({}, item, {
              item1: Object.assign({}, item.item1, {
                sequence: action.text
              })
            })
          } else {
            return Object.assign({}, item, {
              item2: Object.assign({}, item.item2, {
                sequence: action.text
              })
            })
          }
        } else {
          return item
        }
      })
    case 'EDIT_ITEM_PREDICTION':
      return state.map((item, index) => {
        if (index === action.id) {
          return Object.assign({}, item, {
            prediction: Object.assign({}, item.prediction, {
              item1: Object.assign({}, item.prediction.item1, action.pred.item1),
              item2: Object.assign({}, item.prediction.item2, action.pred.item2)
            })
          })
        } else {
          return item
        }
      })
    case 'PREDICT_ITEMS':
      return state.map((item, index) => {
        return Object.assign({}, item, {
          state: 'processing'
        })
      })
    case 'PREDICT_ITEM':
      return state.map((item, index) => {
        if (action.id === index) {
          return Object.assign({}, item, {
            state: 'processing'
          })
        } else {
          return item
        }
      })
    case 'PREDICT_ITEMS_JOB':
      return state.map((item, index) => {
        return Object.assign({}, item, {
          state: 'pending',
          jobid: action.jobid[index]
        })
      })
    case 'PREDICT_ITEM_JOB':
      return state.map((item, index) => {
        if (action.id === index) {
          return Object.assign({}, item, {
            state: 'pending',
            jobid: action.jobid
          })
        } else {
          return item
        }
      })
    case 'REMOVE_ITEM':
      if (state.length > 1) {
        return state.filter((item, index) => {
          return index !== action.id
        })
      } else {
        return [...initalState]
      }
    default:
      return state
  }
}

export default items