import { connect } from 'react-redux'
import FirebaseUI from '../components/FirebaseUI'
import { hideUI, userCompleted } from '../actions/index'

const mapStateToProps = state => {
  return {
    showUI: state.profile.showUI
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeUI: () => {dispatch(hideUI())},
    userCompleted: () => {dispatch(userCompleted())}
  }
}

const SigninUI = connect(
  mapStateToProps,
  mapDispatchToProps
)(FirebaseUI)

export default SigninUI