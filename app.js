const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('public/index.html')
})

app.listen(3000);