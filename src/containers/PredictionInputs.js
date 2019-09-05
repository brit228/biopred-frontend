import { connect } from 'react-redux'
import InputItems from '../components/PredictionItem'
import {
  editItemMolecule, editItemType, editItemText, editItemPrediction, editItemSequence,
  addItem, removeItem, predictItems, predictItem, predictItemsJob, predictItemJob
} from '../actions/index'

const predictAll = (payload) => {
  return (dispatch) => {
    fetch("http://api.biopred.app/graph", {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: '{postPredictionJobs(inputs: {predictions: ['+payload.items.map((item) => (
          `{
            item1: {
              sequence: "${item.item1.sequence}",
              searchType: "${item.item1.search_type}",
              itemType: "${item.item1.input_type}"
            },
            item2: {
              sequence: "${item.item2.sequence}",
              searchType: "${item.item2.search_type}",
              itemType: "${item.item2.input_type}"
            },
            predSubSeqItem1: ${item.prediction.item1.checked},
            predSubSeqItem2: ${item.prediction.item2.checked}
          }`)).join(',')+']})}',
        authentication: {
          accessToken: payload.currentUser.c.b,
          uid: payload.currentUser.uid
        }
      })
    }).then(res => res.json()).then(data => {
      console.log(predictItemsJob(data.postPredictionJobs))
      dispatch(predictItemsJob(data.postPredictionJobs))
    })
  }
}

const predictOne = (payload) => {
  return (dispatch) => {
    fetch("https://api.biopred.app/graph", {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `{postPredictionJobs(inputs: {predictions: [{
          item1: {
            sequence: "${payload.item.item1.sequence}",
            searchType: "${payload.item.item1.search_type}",
            itemType: "${payload.item.item1.input_type}"
          },
          item2: {
            sequence: "${payload.item.item2.sequence}",
            searchType: "${payload.item.item2.search_type}",
            itemType: "${payload.item.item2.input_type}"
          },
          predSubSeqItem1: ${payload.item.prediction.item1.checked},
          predSubSeqItem2: ${payload.item.prediction.item2.checked}
        }]})}`,
        authentication: {
          accessToken: payload.currentUser.c.b,
          uid: payload.currentUser.uid
        }
      })
    }).then(res => res.json()).then(data => {
      dispatch(predictItemJob(payload.id, data.data.postPredictionJobs[0]))
    })
  }
}

const mapStateToProps = state => {
  return {
    items: state.items
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addItem: () => {dispatch(addItem())},
    removeItem: (id) => {dispatch(removeItem(id))},
    editMolecule: (id, index, typ) => {dispatch(editItemMolecule(id, index, typ))},
    editInput: (id, index, typ) => {dispatch(editItemType(id, index, typ))},
    editText: (id, index, text) => {dispatch(editItemText(id, index, text))},
    editSequence: (id, index, text) => {dispatch(editItemSequence(id, index, text))},
    editPrediction: (id, pred) => {dispatch(editItemPrediction(id, pred))},
    predictAllPrep: () => {dispatch(predictItems())},
    predictOnePrep: (id) => {dispatch(predictItem(id))},
    predictAll: (currentUser, items) => {dispatch(predictAll({currentUser, items}))},
    predictOne: (currentUser, id, item) => {dispatch(predictOne({currentUser, id, item}))}
  }
}

const PredictionInputs = connect(
  mapStateToProps,
  mapDispatchToProps
)(InputItems)

export default PredictionInputs
