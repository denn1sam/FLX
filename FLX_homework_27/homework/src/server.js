  const express = require('express');

const app = express();
const routes = require('./routes');

app.use('/car', routes);
app.get('/', function (req, res) {
  res.send('Server works....');
});

app.listen(3000);
