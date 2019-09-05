import { connect } from 'react-redux'
import InputItems from '../components/PredictionItem'
import {
  editItemMolecule, editItemType, editItemText, editItemPrediction, editItemSequence,
  addItem, removeItem, predictItems, predictItem, predictItemsJob, predictItemJob
} from '../actions/index'

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
    predictAll: (currentUser, items) => {
      dispatch(predictItems())
      fetch("http://127.0.0.1:5000/graph", {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: '{postPredictionJobs(inputs: {predictions: '+JSON.stringify(items.map((item) => ({
            item1: {
              sequence: item.item1.sequence,
              searchType: item.item1.search_type,
              itemType:item.item1.item_type
            },
            item2: {
              sequence: item.item2.sequence,
              searchType: item.item2.search_type,
              itemType:item.item2.item_type
            },
            predSubSeqItem1: item.predictions.item1.checked,
            predSubSeqItem2: item.predictions.item2.checked
          })))+'})}',
          authentication: {
            accessToken: currentUser.c.b,
            uid: currentUser.uid
          }
        })
      }).then(res => res.json()).then(data => {
        predictItemsJob(data.postPredictionJobs)
      })
    },
    predictOne: (currentUser, id, item) => {
      dispatch(predictItem(id))
      fetch("http://127.0.0.1:5000/graph", {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: '{postPredictionJobs(inputs: {predictions: '+JSON.stringify([{
            item1: {
              sequence: item.item1.sequence,
              searchType: item.item1.search_type,
              itemType:item.item1.item_type
            },
            item2: {
              sequence: item.item2.sequence,
              searchType: item.item2.search_type,
              itemType:item.item2.item_type
            },
            predSubSeqItem1: item.predictions.item1.checked,
            predSubSeqItem2: item.predictions.item2.checked
          }])+'})}',
          authentication: {
            accessToken: currentUser.c.b,
            uid: currentUser.uid
          }
        })
      }).then(res => res.json()).then(data => {
        predictItemJob(id, data.postPredictionJobs)
      })
    }
  }
}

const PredictionInputs = connect(
  mapStateToProps,
  mapDispatchToProps
)(InputItems)

export default PredictionInputs
