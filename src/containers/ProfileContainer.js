import { connect } from 'react-redux'

import Profile from '../components/Profile'

const mapStateToProps = state => {
  return {
    limit: state.profile.limit
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)

export default ProfileContainer