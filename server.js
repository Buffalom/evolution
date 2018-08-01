const fs = require('fs')
var express = require('express')
var app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


function makeId (length) {
  if (!length) throw new Error('Please provide a length to generate an id')
  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var idArray = new Array(length).fill(undefined)
  return idArray.map(() => chars.charAt(Math.floor(Math.random() * chars.length))).join('')
}

function initFileIfNotExists (path) {
  if (!fs.existsSync(path)) {
    fs.writeFileSync(path, JSON.stringify({
      worlds: {}
    }, null, '  '))
  }
}


const idLength = 5
const serverDataFile = './serverData.json'

app.get('/worlds/:id([a-zA-Z0-9]{5})', (req, res) => {
  initFileIfNotExists(serverDataFile)
  let data = JSON.parse(fs.readFileSync(serverDataFile))
  data.worlds[req.params.id]
    ? res.send(data.worlds[req.params.id])
    : res.status(404).send({ message: `No world with id ${req.params.id} found.`})
})

app.post('/worlds/add', (req, res) => {
  initFileIfNotExists(serverDataFile)
  let data = JSON.parse(fs.readFileSync(serverDataFile))
  let maxCycles = 10
  for (let cycle = 0; cycle < maxCycles; cycle++) {
    let id = makeId(idLength)
    if (!data.worlds[id]) {
      data.worlds[id] = {
        worldHash: req.body.worldHash || ''
      }
      fs.writeFileSync(serverDataFile, JSON.stringify(data, null, '  '))
      res.send({ id })
      return
    }
  }
  res.status(500).send({ message: `No available id could be generated with ${maxCycles} tries.`})
})

app.post('/worlds/clear', (req, res) => {
  initFileIfNotExists(serverDataFile)
  let data = JSON.parse(fs.readFileSync(serverDataFile))
  data.worlds = {}
  fs.writeFileSync(serverDataFile, JSON.stringify(data, null, '  '))
  res.send({ message: 'All worlds cleared' })
})

const sendIndex = (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
}
app.get('^/:id([a-zA-Z0-9]{5})', sendIndex)
app.get('/', sendIndex)
app.get('/assets/*', express.static(__dirname + '/public'))

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server listening on port ${port}!`)
})
