export default {
  vuexLogout (state) {
    state.username = ''
    localStorage.username = ''
  },
  vuexLogin (state, username) {
    state.username = username
    localStorage.username = username
  }
}