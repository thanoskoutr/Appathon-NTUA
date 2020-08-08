const connection = require('./connection');

exports.SelectAllMoviesQuery = (result) => {
		connection.query(`SELECT * FROM Movies`, (err, res) => {
		  if (err) {
		    console.log("error: ", err);
		    result(err, null);
		    return;
		  }

		  console.log("All Movies: ", res);
   		result(null, res);
    	return;
  });
}

exports.SelectAllTitlesQuery = (result) => {
		connection.query(`SELECT Title FROM Movies`, (err, res) => {
		  if (err) {
		    console.log("error: ", err);
		    result(err, null);
		    return;
		  }

		  console.log("Titles: ", res);
   		result(null, res);
    	return;
  });
}

exports.SelectAllDirectorsQuery = (result) => {
		connection.query(`SELECT DISTINCT Directors FROM Movies WHERE Directors IS NOT NULL ORDER BY Directors ASC`, (err, res) => {
		  if (err) {
		    console.log("error: ", err);
		    result(err, null);
		    return;
		  }

		  console.log("Directors: ", res);
   		result(null, res);
    	return;
  });
}

exports.SelectAllCountriesQuery = (result) => {
		connection.query(`SELECT DISTINCT Country FROM Movies WHERE Country IS NOT NULL ORDER BY Country ASC`, (err, res) => {
		  if (err) {
		    console.log("error: ", err);
		    result(err, null);
		    return;
		  }

		  console.log("Countries: ", res);
   		result(null, res);
    	return;
  });
}

exports.SelectAllLanguagesQuery = (result) => {
		connection.query(`SELECT DISTINCT Language FROM Movies WHERE Language IS NOT NULL ORDER BY Language ASC`, (err, res) => {
		  if (err) {
		    console.log("error: ", err);
		    result(err, null);
		    return;
		  }

		  console.log("Languages: ", res);
   		result(null, res);
    	return;
  });
}

exports.SelectAllYearsQuery = (result) => {
		connection.query(`SELECT DISTINCT Year FROM Movies ORDER BY Year ASC`, (err, res) => {
		  if (err) {
		    console.log("error: ", err);
		    result(err, null);
		    return;
		  }

		  console.log("Years: ", res);
   		result(null, res);
    	return;
  });
}

exports.SelectAllRuntimesQuery = (result) => {
		connection.query(`SELECT DISTINCT Runtime FROM Movies WHERE Runtime IS NOT NULL ORDER BY Runtime ASC`, (err, res) => {
		  if (err) {
		    console.log("error: ", err);
		    result(err, null);
		    return;
		  }

		  console.log("Runtimes: ", res);
   		result(null, res);
    	return;
  });
}

exports.SelectAllAgesQuery = (result) => {
		connection.query(`SELECT DISTINCT Age FROM Movies WHERE Age IS NOT NULL ORDER BY Age ASC`, (err, res) => {
		  if (err) {
		    console.log("error: ", err);
		    result(err, null);
		    return;
		  }

		  console.log("Ages: ", res);
   		result(null, res);
    	return;
  });
}

exports.SelectAllIMDbScoresQuery = (result) => {
		connection.query(`SELECT DISTINCT IMDb FROM Movies WHERE IMDb IS NOT NULL ORDER BY IMDb ASC`, (err, res) => {
		  if (err) {
		    console.log("error: ", err);
		    result(err, null);
		    return;
		  }

		  console.log("IMDb Scores: ", res);
   		result(null, res);
    	return;
  });
}

exports.SelectAllRottenScoresQuery = (result) => {
		connection.query(`SELECT DISTINCT Rotten_Tomatoes FROM Movies WHERE Rotten_Tomatoes IS NOT NULL ORDER BY Rotten_Tomatoes ASC`, (err, res) => {
		  if (err) {
		    console.log("error: ", err);
		    result(err, null);
		    return;
		  }

		  console.log("Rotten_Tomatoes Scores: ", res);
   		result(null, res);
    	return;
  });
}

exports.SelectAllGenresQuery = (result) => {
		connection.query(`SELECT DISTINCT Genres FROM Movies WHERE Genres IS NOT NULL ORDER BY Genres ASC`, (err, res) => {
		  if (err) {
		    console.log("error: ", err);
		    result(err, null);
		    return;
		  }

		  console.log("Genres: ", res);
   		result(null, res);
    	return;
  });
}








exports.SelectTitleQuery = (title, result) => {
		connection.query(`SELECT * FROM Movies WHERE Title='${title}'`, (err, res) => {
		  if (err) {
		    console.log("error: ", err);
		    result(err, null);
		    return;
		  }

		  console.log(title, "Movies: ", res);
   		result(null, res);
    	return;
  });
}

exports.SelectPlatformQuery = (platform, result) => {
		connection.query(`SELECT * FROM Movies WHERE ${platform}=1 ORDER BY Year DESC`, (err, res) => {
		  if (err) {
		    console.log("error: ", err);
		    result(err, null);
		    return;
		  }

		  console.log(platform, "Movies: ", res);
   		result(null, res);
    	return;
  });
}

exports.SelectDirectorQuery = (director, result) => {
		connection.query(`SELECT * FROM Movies WHERE Directors='${director}' ORDER BY Year DESC`, (err, res) => {
		  if (err) {
		    console.log("error: ", err);
		    result(err, null);
		    return;
		  }

		  console.log(director, "Movies: ", res);
   		result(null, res);
    	return;
  });
}

exports.SelectCountryQuery = (country, result) => {
		connection.query(`SELECT * FROM Movies WHERE Country='${country}' ORDER BY Year DESC`, (err, res) => {
		  if (err) {
		    console.log("error: ", err);
		    result(err, null);
		    return;
		  }

		  console.log(country, "Movies: ", res);
   		result(null, res);
    	return;
  });
}

exports.SelectLanguageQuery = (language, result) => {
		connection.query(`SELECT * FROM Movies WHERE Language='${language}' ORDER BY Year DESC`, (err, res) => {
		  if (err) {
		    console.log("error: ", err);
		    result(err, null);
		    return;
		  }

		  console.log(language, "Movies: ", res);
   		result(null, res);
    	return;
  });
}

exports.SelectYearQuery = (year, result) => {
		connection.query(`SELECT * FROM Movies WHERE Year=${year} ORDER BY Title ASC`, (err, res) => {
		  if (err) {
		    console.log("error: ", err);
		    result(err, null);
		    return;
		  }

		  console.log(year, "Movies: ", res);
   		result(null, res);
    	return;
  });
}

exports.SelectRuntimeQuery = (runtime, result) => {
		connection.query(`SELECT * FROM Movies WHERE Runtime=${runtime} ORDER BY Year DESC`, (err, res) => {
		  if (err) {
		    console.log("error: ", err);
		    result(err, null);
		    return;
		  }

		  console.log(runtime, "Movies: ", res);
   		result(null, res);
    	return;
  });
}

exports.SelectAgeQuery = (age, result) => {
		connection.query(`SELECT * FROM Movies WHERE Age='${age}' ORDER BY Year DESC`, (err, res) => {
		  if (err) {
		    console.log("error: ", err);
		    result(err, null);
		    return;
		  }

		  console.log(age, "Movies: ", res);
   		result(null, res);
    	return;
  });
}

exports.SelectIMDbScoreQuery = (imdb, result) => {
		connection.query(`SELECT * FROM Movies WHERE IMDb='${imdb}' ORDER BY Year DESC`, (err, res) => {
		  if (err) {
		    console.log("error: ", err);
		    result(err, null);
		    return;
		  }

		  console.log(imdb, "Movies: ", res);
   		result(null, res);
    	return;
  });
}

exports.SelectRottenScoreQuery = (rotten, result) => {
		connection.query(`SELECT * FROM Movies WHERE Rotten_Tomatoes='${rotten}%' ORDER BY Year DESC`, (err, res) => {
		  if (err) {
		    console.log("error: ", err);
		    result(err, null);
		    return;
		  }

		  console.log(rotten, "% Movies: ", res);
   		result(null, res);
    	return;
  });
}

exports.SelectGenreQuery = (genre, result) => {
		connection.query(`SELECT * FROM Movies WHERE Genres='${genre}' ORDER BY Year DESC`, (err, res) => {
		  if (err) {
		    console.log("error: ", err);
		    result(err, null);
		    return;
		  }

		  console.log(genre, "Movies: ", res);
   		result(null, res);
    	return;
  });
}
