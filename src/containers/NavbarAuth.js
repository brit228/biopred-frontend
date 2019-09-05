import { connect } from 'react-redux'
import Navbar from '../components/Navbar'
import { showUI, userCompleted, checkUserCompleted } from '../actions/index'

const mapStateToProps = state => {
  return {
    userComplete: state.profile.userComplete
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showUI: () => {dispatch(showUI())},
    userCompleted: () => {dispatch(userCompleted())},
    checkUserCompleted: () => {dispatch(checkUserCompleted())}
  }
}

const NavbarAuth = connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar)

export default NavbarAuth
