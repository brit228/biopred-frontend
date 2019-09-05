import { connect } from 'react-redux'
import FirebaseUI from '../components/FirebaseUI'
import { hideUI } from '../actions/index'

const mapStateToProps = state => {
  return {
    showUI: state.profile.showUI
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeUI: () => {dispatch(hideUI())}
  }
}

const SigninUI = connect(
  mapStateToProps,
  mapDispatchToProps
)(FirebaseUI)

export default SigninUI