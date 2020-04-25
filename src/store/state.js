let defaultUsername = ''
try {
  if (localStorage.username) {
    defaultUsername = localStorage.username
  }
} catch (e) { }

export default {
  username: defaultUsername
}