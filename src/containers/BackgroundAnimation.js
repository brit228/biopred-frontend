import { connect } from 'react-redux'
import BackgroundAnimation from '../components/BackgroundAnimation'
import { moveParticles } from '../actions/index'

const mapStateToProps = state => {
  return {
    particles: state.animation
  }
}

const mapDispatchToProps = dispatch => {
  return {
    moveParticles: (time) => {dispatch(moveParticles(time))}
  }
}

const Animation = connect(
  mapStateToProps,
  mapDispatchToProps
)(BackgroundAnimation)

export default Animation
