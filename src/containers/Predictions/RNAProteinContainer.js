import { connect } from 'react-redux'
import RNAProteinPrediction from '../../components/Predictions/RNAProteinPredictions'

const mapStateToProps = state => {
  return {
    limit: state.profile.limit
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

const RNAProteinContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RNAProteinPrediction)

export default RNAProteinContainer
