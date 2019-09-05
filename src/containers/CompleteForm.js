import { connect } from 'react-redux'
import CompleteModal from '../components/CompleteModal'
import { hideUI } from '../actions/index'

const mapStateToProps = state => {
  return {
    userComplete: state.profile.userComplete,
    checkUserComplete: state.profile.checkUserComplete
  }
}

const mapDispatchToProps = dispatch => {
  return {
    hide: () => {dispatch(hideUI())}
  }
}

const CompleteForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(CompleteModal)

export default CompleteForm
