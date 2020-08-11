const express = require('express');
const controller = require('../controllers/controllers.js');
const connection = require('../models/connection');

const router = express.Router();

router.get('/AllMovies', controller.SelectAllMovies);

router.get('/Title/', controller.SelectAllTitles);
router.get('/Title/:title', controller.SelectTitle);

router.get('/Directors', controller.SelectAllDirectors);
router.get('/Directors/:director', controller.SelectDirector);

router.get('/platform', controller.SelectAllPlatforms);
/* query parameters = { offset, limit, orderBy, order, title } */
router.get('/platform/:platform', controller.SelectPlatform);
/* operation = { and, or } */
router.get('/platform/:operation/:platform1/:platform2', controller.SelectPlatforms2);
router.get('/platform/:operation/:platform1/:platform2/:platform3', controller.SelectPlatforms3);
router.get('/platform/:operation/:platform1/:platform2/:platform3/:platform4', controller.SelectPlatforms4);
// router.get('/platform/:operation/:platform/statistics', controller.SelectPlatform);

router.get('/Country', controller.SelectAllCountries);
router.get('/Country/:country', controller.SelectCountry);

router.get('/Language', controller.SelectAllLanguages);
router.get('/Language/:language', controller.SelectLanguage);

router.get('/Year', controller.SelectAllYears);
router.get('/Year/:year', controller.SelectYear);

router.get('/Runtime', controller.SelectAllRuntimes);
router.get('/Runtime/:runtime', controller.SelectRuntime);

router.get('/Age', controller.SelectAllAges);
router.get('/Age/:age', controller.SelectAge);

router.get('/IMDb', controller.SelectAllIMDbScores);
router.get('/IMDb/:imdb', controller.SelectIMDbScore);

router.get('/Rotten_Tomatoes', controller.SelectAllRottenScores);
router.get('/Rotten_Tomatoes/:rotten', controller.SelectRottenScore);

router.get('/Genres', controller.SelectAllGenres);
router.get('/Genres/:genre', controller.SelectGenre);

module.exports = router;
