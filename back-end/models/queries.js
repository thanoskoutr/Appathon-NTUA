const connection = require('./connection');

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

		  // console.log("Languages: ", res);
   		result(null, res);
    	return;
  });
}

exports.SelectAllYearsQuery = (result) => {
		connection.query(`SELECT DISTINCT Year FROM Movies ORDER BY Year DESC`, (err, res) => {
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

		  // console.log("Genres: ", res);
   		result(null, res);
    	return;
  });
}








exports.SelectPlatformQuery = (platform, offset, limit, orderBy, order, title, director, language, genre, year, country, age, result) => {
		connection.query(`SELECT * FROM Movies WHERE ${platform}=1 AND Title LIKE "%${title}%"
																															 AND Directors LIKE "%${director}%"
																															 AND Language LIKE "%${language}%"
																															 AND Genres LIKE "%${genre}%"
																															 AND Year LIKE "%${year}%"
																															 AND Country LIKE "%${country}%"
																															 AND Age LIKE "%${age}%"
																															 ORDER BY ${orderBy}='', ${orderBy} ${order} LIMIT ${limit} OFFSET ${offset}`, (err, res) => {
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

exports.SelectPlatforms2Query = (operation, platform1, platform2, offset, limit, orderBy, order, title, director, language, genre, year, country, age, result) => {
		connection.query(`SELECT * FROM Movies WHERE (${platform1}=1 ${operation} ${platform2}=1) AND Title LIKE "%${title}%"
																																															AND Directors LIKE "%${director}%"
																																															AND Language LIKE "%${language}%"
																																															AND Genres LIKE "%${genre}%"
																																															AND Year LIKE "%${year}%"
																																															AND Country LIKE "%${country}%"
																																															AND Age LIKE "%${age}%"
																																															ORDER BY ${orderBy}='', ${orderBy} ${order} LIMIT ${limit} OFFSET ${offset}`, (err, res) => {
		  if (err) {
		    console.log("error: ", err);
		    result(err, null);
		    return;
		  }

		  console.log(platform1, operation, platform2, "Movies: ", res);
   		result(null, res);
    	return;
  });
}

exports.SelectPlatforms3Query = (operation, platform1, platform2, platform3, offset, limit, orderBy, order, title, director, language, genre, year, country, age, result) => {
		connection.query(`SELECT * FROM Movies WHERE (${platform1}=1 ${operation} ${platform2}=1 ${operation} ${platform3}=1)
																													AND Title LIKE "%${title}%"
																													AND Directors LIKE "%${director}%"
																													AND Language LIKE "%${language}%"
																													AND Genres LIKE "%${genre}%"
																													AND Year LIKE "%${year}%"
																													AND Country LIKE "%${country}%"
																													AND Age LIKE "%${age}%"
																													ORDER BY ${orderBy}='', ${orderBy} ${order} LIMIT ${limit} OFFSET ${offset}`, (err, res) => {
		  if (err) {
		    console.log("error: ", err);
		    result(err, null);
		    return;
		  }

		  console.log(platform1, operation, platform2, operation, platform3, "Movies: ", res);
   		result(null, res);
    	return;
  });
}

exports.SelectPlatforms4Query = (operation, platform1, platform2, platform3, platform4, offset, limit, orderBy, order, title, director, language, genre, year, country, age, result) => {
		connection.query(`SELECT * FROM Movies WHERE (${platform1}=1 ${operation} ${platform2}=1 ${operation} ${platform3}=1 ${operation} ${platform4}=1)
																												 AND Title LIKE "%${title}%"
																												 AND Directors LIKE "%${director}%"
																												 AND Language LIKE "%${language}%"
																												 AND Genres LIKE "%${genre}%"
																												 AND Year LIKE "%${year}%"
																												 AND Country LIKE "%${country}%"
																												 AND Age LIKE "%${age}%"
																												 ORDER BY ${orderBy}='', ${orderBy} ${order} LIMIT ${limit} OFFSET ${offset}`, (err, res) => {
		  if (err) {
		    console.log("error: ", err);
		    result(err, null);
		    return;
		  }

		  console.log(platform1, operation, platform2, operation, platform3, operation, platform4, "Movies: ", res);
   		result(null, res);
    	return;
  });
}

exports.SelectPlatformStatisticsQuery = (result) => {
		connection.query(`SELECT COUNT(ID) FROM Movies;
											SELECT COUNT(ID),Netflix FROM Movies GROUP BY Netflix;
											SELECT COUNT(ID),Hulu FROM Movies GROUP BY Hulu;
											SELECT COUNT(ID),Prime_Video FROM Movies GROUP BY Prime_Video;
											SELECT COUNT(ID),Disney FROM Movies GROUP BY Disney;
											`, (err, res) => {
		  if (err) {
		    console.log("error: ", err);
		    result(err, null);
		    return;
		  }

		  console.log("Statistics: ", res);
   		result(null, res);
    	return;
  });
}
