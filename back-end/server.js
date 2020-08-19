const express = require('express');
const cors = require('cors');
const helmet = require("helmet");
const compression = require('compression');
const app = express();  // Create Express App
const port = 8000;

require('dotenv').config();

app.use(cors());
app.use(helmet());
app.use(compression());

app.get('/', (req, res) => res.send('Hello World!'));

const routes = require('./routes/routes.js');
app.use('/', routes); // Filters the URL

/* Generic Page Not Found ERROR */
app.use((req, res, next) => {
  res.status(404).send('404: Page Not Found');
});


app.listen(port, () => console.log(`Appathon Movies API listening at http://localhost:${port}`))

module.exports = app;
