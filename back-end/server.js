const express = require('express');
const app = express();  // Create Express App
const port = 8000;

require('dotenv').config()

app.get('/', (req, res) => res.send('Hello World!'));

const routes = require('./routes/routes.js');
app.use('/', routes); // Filters the URL

/* Generic Page Not Found ERROR */
app.use((req, res, next) => {
  res.status(404).send('404: Page Not Found');
});


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

module.exports = app;
