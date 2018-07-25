var express = require('express')
var app = express()

app.use(express.static(__dirname))

var port = process.env.PORT || 5000
var server = app.listen(port)
console.log(`Server listening on port ${port}`)
