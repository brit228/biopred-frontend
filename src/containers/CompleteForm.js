import { connect } from 'react-redux'
import CompleteModal from '../components/CompleteModal'
import { hideUI, userCompleted } from '../actions/index'

const mapStateToProps = state => {
  return {
    userComplete: state.profile.userComplete,
    checkUserComplete: state.profile.checkUserComplete
  }
}

const mapDispatchToProps = dispatch => {
  return {
    hide: () => {dispatch(hideUI())},
    userCompleted: (limit) => {dispatch(userCompleted(limit))}
  }
}

const CompleteForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(CompleteModal)

export default CompleteForm
