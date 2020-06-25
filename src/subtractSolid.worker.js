/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
// https://github.com/webpack-contrib/worker-loader
export default () => {
  self.addEventListener('message', e => {
    // eslint-disable-line no-restricted-globals
    if (!e) return
    importScripts('../node_modules/three/Three.js')

    const users = []

    const userDetails = {
      name: 'Jane Doe',
      email: 'jane.doe@gmail.com',
      id: 1,
    }

    for (let i = 0; i < 100000; i++) {
      userDetails.id = i++
      userDetails.dateJoined = Date.now()

      users.push(userDetails)
    }

    postMessage(users)
  })
}
