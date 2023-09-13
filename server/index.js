const express = require('express')
const verifyProof = require('../utils/verifyProof')

const port = 1225

const app = express()
app.use(express.json())

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT = '31bcc98e6de0935b6558687871023458f6b685d21ad812597958a3ff62f3ef08'

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const {name = '', proof = ''} = req.body

  const isInTheList = verifyProof(proof, name, MERKLE_ROOT)
  if (isInTheList) {
    res.send('You got a toy robot!')
  } else {
    res.send('You are not on the list :(')
  }
})

app.listen(port, () => {
  console.log(`Listening on port ${port}!`)
})
