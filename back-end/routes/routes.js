const express = require('express');
const controller = require('../controllers/controllers.js');
const connection = require('../models/connection');

const router = express.Router();

router.get('/TMDB/configuration', controller.TMDBConfiguration);
router.get('/TMDB/search/movie', controller.TMDBSearchMovie);

router.get('/platform', controller.SelectAllPlatforms);
router.get('/platform/statistics', controller.SelectPlatformStatistics);
/* query parameters = { offset, limit, orderBy, order, title, director } */
router.get('/platform/:platform', controller.SelectPlatform);
/* operation = { and, or } */
router.get('/platform/:operation/:platform1/:platform2', controller.SelectPlatforms2);
router.get('/platform/:operation/:platform1/:platform2/:platform3', controller.SelectPlatforms3);
router.get('/platform/:operation/:platform1/:platform2/:platform3/:platform4', controller.SelectPlatforms4);

router.get('/Title/', controller.SelectAllTitles);
router.get('/Directors', controller.SelectAllDirectors);
router.get('/Country', controller.SelectAllCountries);
router.get('/Language', controller.SelectAllLanguages);
router.get('/Year', controller.SelectAllYears);
router.get('/Runtime', controller.SelectAllRuntimes);
router.get('/Age', controller.SelectAllAges);
router.get('/IMDb', controller.SelectAllIMDbScores);
router.get('/Rotten_Tomatoes', controller.SelectAllRottenScores);
router.get('/Genres', controller.SelectAllGenres);
module.exports = router;
