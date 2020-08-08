const express = require('express');
const controller = require('../controllers/controllers.js');
const connection = require('../models/connection');

const router = express.Router();

router.get('/AllMovies', controller.SelectAllMovies);

router.get('/title/', controller.SelectAllTitles);
router.get('/title/:title', controller.SelectTitle);

router.get('/director', controller.SelectAllDirectors);
router.get('/director/:director', controller.SelectDirector);

router.get('/platform', controller.SelectAllPlatforms);
router.get('/platform/:platform', controller.SelectPlatform);
router.get('/platform/:platform/statistics', controller.SelectPlatform);

router.get('/country', controller.SelectAllCountries);
router.get('/country/:country', controller.SelectCountry);

router.get('/language', controller.SelectAllLanguages);
router.get('/language/:language', controller.SelectLanguage);

router.get('/year', controller.SelectAllYears);
router.get('/year/:year', controller.SelectYear);

router.get('/runtime', controller.SelectAllRuntimes);
router.get('/runtime/:runtime', controller.SelectRuntime);

router.get('/age', controller.SelectAllAges);
router.get('/age/:age', controller.SelectAge);

router.get('/imdb', controller.SelectAllIMDbScores);
router.get('/imdb/:imdb', controller.SelectIMDbScore);

router.get('/rotten', controller.SelectAllRottenScores);
router.get('/rotten/:rotten', controller.SelectRottenScore);

router.get('/genre', controller.SelectAllGenres);
router.get('/genre/:genre', controller.SelectGenre);

module.exports = router;
