const queryRes = require('../models/queries.js');
const fetch = require('node-fetch');
const fs = require('fs')

function getDistinctResults (data, type) {
	// Create Object with distinct results
	let resultsDistinct = {};
	data.forEach(Obj => {
		let resSplitByComma = Obj[type].split(",");
		resSplitByComma.forEach(item => {
			resultsDistinct[item] = true;
		})
	})

	// Create JSON list with distinct results
	const jsonArray = [];
	const unsortedList = [];
	for (itm in resultsDistinct) {
		unsortedList.push(itm);
	}
	const sortedList = unsortedList.sort();
	sortedList.forEach(item => {
		const tmp = {};
		tmp[type] = item;
		jsonArray.push(tmp);
	});

	return jsonArray;

}

function getSortedPercResults (data, type) {
	let resultsDistinct = [];
	data.forEach(Obj => {
		itemWoutPercList = Obj[type].split("%",1);
		itemWoutPerc = itemWoutPercList[0];
		resultsDistinct.push(parseInt(itemWoutPerc));
	})
	const sortedListWoutPerc = resultsDistinct.sort((a, b) => a - b);
	const sortedList = [];
	sortedListWoutPerc.forEach(itm => {
		const tmp = {};
		tmp[type] = itm+"%";
		sortedList.push(tmp);
	});

	return sortedList;

}

exports.TMDBConfiguration = (req, res) => {
	fetch(`https://api.themoviedb.org/3/configuration?api_key=${process.env.TMDB_API_KEY}`,{
		method: 'GET',
	})
	.then((response) => {
		console.log(response.status, response.statusText);
		if (!response.ok) {
			res.status(400).send('Bad Request');
		}
		else {
			return response.json();
		}
	})
	.then(
		(json) => {
			console.log(json);
			res.json(json);
		})
		.catch((error) => {
			console.error('Error:', error);
			res.status(400).send('No Connection');
		});
}

exports.TMDBSearchMovie = (req, res) => {
	const title = req.params.title;
	const base_url = req.query.base_url;
	const poster_size = req.params.poster_size;

	fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${title}`,{
		method: 'GET',
	})
	.then((response) => {
		console.log(response.status, response.statusText);
		if (!response.ok) {
			res.status(400).send('Bad Request');
		}
		else {
			return response.json();
		}
	})
	.then(
		(json) => {
			const results = json.results[0];
			const poster_path = json.results[0].poster_path;

			fetch(`${base_url}${poster_size}${poster_path}`,{
				method: 'GET',
			})
			.then((response) => {
				console.log(response.status, response.statusText);
				if (!response.ok) {
					res.status(400).send('No Photo');
				}
				else {
					return response;
				}
			})
			.then(
				(image) => {
					// const writeStream = fs.createWriteStream(`./photos/photo_${poster_path.split("/")[1]}`);
					const writeStream = fs.createWriteStream(`./photos/photo`);
					image.body.pipe(writeStream);

					image.body.on('end', () => {

						// const readStream = fs.createReadStream(`./photos/photo_${poster_path.split("/")[1]}`);
						const readStream = fs.createReadStream(`./photos/photo`);
				    readStream.on('open', () => {
				        res.set('Content-Type', 'image/jpeg');
				        readStream.pipe(res);
				    });
				    readStream.on('error', () => {
				        res.set('Content-Type', 'text/plain');
				        res.status(404).end('Not found');
				    });

					});

				})
				.catch((error) => {
					console.error('Error:', error);
					res.status(400).send('No Photo');
				});

		})
		.catch((error) => {
			console.error('Error:', error);
			res.status(400).send('No Path');
		});
}

exports.SelectAllTitles = (req, res) => {
	queryRes.SelectAllTitlesQuery((err, data) => {
		if (err) {
			res.status(400).send('Bad Request');
		}
		else {
			if (!data.length) {
				res.statusMessage = "No Data";
				res.status(403).send('No Data');
			}
			else {
					res.json(data)
			}
		}

	});
}

exports.SelectAllPlatforms = (req, res) => {
	res.json(
		[
			{
				platform: "Netflix"
			},
			{
				platform: "Hulu"
			},
			{
				platform: "Prime_Video"
			},
			{
				platform: "Disney"
			}
		]
	);
}

exports.SelectAllDirectors = (req, res) => {
	queryRes.SelectAllDirectorsQuery((err, data) => {
		if (err) {
			res.status(400).send('Bad Request');
		}
		else {
			if (!data.length) {
				res.statusMessage = "No Data";
				res.status(403).send('No Data');
			}
			else {
				res.json(getDistinctResults(data, "Directors"));
				//res.json(data)
			}
		}

	});
}

exports.SelectAllCountries = (req, res) => {
	queryRes.SelectAllCountriesQuery((err, data) => {
		if (err) {
			res.status(400).send('Bad Request');
		}
		else {
			if (!data.length) {
				res.statusMessage = "No Data";
				res.status(403).send('No Data');
			}
			else {
				res.json(getDistinctResults(data, "Country"));
				// res.json(data);
			}
		}

	});
}

exports.SelectAllLanguages = (req, res) => {
	queryRes.SelectAllLanguagesQuery((err, data) => {
		if (err) {
			res.status(400).send('Bad Request');
		}
		else {
			if (!data.length) {
				res.statusMessage = "No Data";
				res.status(403).send('No Data');
			}
			else {
				res.json(getDistinctResults(data, "Language"));
			}

		}

	});
}

exports.SelectAllYears = (req, res) => {
	queryRes.SelectAllYearsQuery((err, data) => {
		if (err) {
			res.status(400).send('Bad Request');
		}
		else {
			if (!data.length) {
				res.statusMessage = "No Data";
				res.status(403).send('No Data');
			}
			else {
				data.splice(0, 0, {Year: ''})
				res.json(data);
			}
		}

	});
}

exports.SelectAllRuntimes = (req, res) => {
	queryRes.SelectAllRuntimesQuery((err, data) => {
		if (err) {
			res.status(400).send('Bad Request');
		}
		else {
			if (!data.length) {
				res.statusMessage = "No Data";
				res.status(403).send('No Data');
			}
			else {
					res.json(data)
			}
		}

	});
}

exports.SelectAllAges = (req, res) => {
	queryRes.SelectAllAgesQuery((err, data) => {
		if (err) {
			res.status(400).send('Bad Request');
		}
		else {
			if (!data.length) {
				res.statusMessage = "No Data";
				res.status(403).send('No Data');
			}
			else {
					res.json(data)
			}
		}

	});
}

exports.SelectAllIMDbScores = (req, res) => {
	queryRes.SelectAllIMDbScoresQuery((err, data) => {
		if (err) {
			res.status(400).send('Bad Request');
		}
		else {
			if (!data.length) {
				res.statusMessage = "No Data";
				res.status(403).send('No Data');
			}
			else {
					res.json(data)
			}
		}

	});
}

exports.SelectAllRottenScores = (req, res) => {
	queryRes.SelectAllRottenScoresQuery((err, data) => {
		if (err) {
			res.status(400).send('Bad Request');
		}
		else {
			if (!data.length) {
				res.statusMessage = "No Data";
				res.status(403).send('No Data');
			}
			else {
				res.json(getSortedPercResults(data, "Rotten_Tomatoes"));
				// res.json(data);
			}
		}

	});
}

exports.SelectAllGenres = (req, res) => {
	queryRes.SelectAllGenresQuery((err, data) => {
		if (err) {
			res.status(400).send('Bad Request');
		}
		else {
			if (!data.length) {
				res.statusMessage = "No Data";
				res.status(403).send('No Data');
			}
			else {
				res.json(getDistinctResults(data, "Genres"));
				//res.json(data);
			}
		}

	});
}






exports.SelectTitle = (req, res) => {
	const title = req.params.title;
	queryRes.SelectTitleQuery(title, (err, data) => {
		if (err) {
			res.status(400).send('Bad Request');
		}
		else {
			if (!data.length) {
				res.statusMessage = "No Data";
				res.status(403).send('No Data');
			}
			else {
					res.json(data)
			}
		}

	});
}

exports.SelectPlatform = (req, res) => {
	const platform = req.params.platform;
	let offset = req.query.offset;
	let limit = req.query.limit;
	let orderBy = req.query.orderBy;
	let order = req.query.order;
	let title = req.query.title;
	let director = req.query.director;
	let language = req.query.language;
	let genre = req.query.genre;
	let year = req.query.year;
	let country = req.query.country;
	let age = req.query.age;
	if (limit === undefined)
		limit = 18446744073709551;
	if (offset === undefined)
		offset = 0;
	if (orderBy === undefined)
		orderBy = "Title";
	if (order === undefined)
		order = "ASC";
	if (title === undefined)
		title = '';
	if (director === undefined)
		director = '';
	if (language === undefined)
		language = '';
	if (genre === undefined)
		genre = '';
	if (year === undefined)
		year = '';
	if (country === undefined)
		country = '';
	if (age === undefined)
		age = '';
	if (age == "7" || age == "13" || age == "16" || age == "18")
		age = age + "+";
	queryRes.SelectPlatformQuery(platform, offset, limit, orderBy, order, title, director, language, genre, year, country, age, (err, data) => {
		if (err) {
			res.status(400).send('Bad Request');
		}
		else {
			if (!data.length) {
				res.statusMessage = "No Data";
				res.status(403).send('No Data');
			}
			else {
					res.json(data)
			}
		}

	});
}

exports.SelectPlatforms2 = (req, res) => {
	if (req.params.operation != "and" && req.params.operation != "or") {
		res.status(400).send('Bad Request');
	}
	const operation = req.params.operation;
	const platform1 = req.params.platform1;
	const platform2 = req.params.platform2;
	let offset = req.query.offset;
	let limit = req.query.limit;
	let orderBy = req.query.orderBy;
	let order = req.query.order;
	let title = req.query.title;
	let director = req.query.director;
	let language = req.query.language;
	let genre = req.query.genre;
	let year = req.query.year;
	let country = req.query.country;
	let age = req.query.age;
	if (limit === undefined)
		limit = 18446744073709551;
	if (offset === undefined)
		offset = 0;
	if (orderBy === undefined)
		orderBy = "Title";
	if (order === undefined)
		order = "ASC";
	if (title === undefined)
		title = '';
	if (director === undefined)
		director = '';
	if (language === undefined)
		language = '';
	if (genre === undefined)
		genre = '';
	if (year === undefined)
		year = '';
	if (country === undefined)
		country = '';
	if (age === undefined)
		age = '';
	if (age == "7" || age == "13" || age == "16" || age == "18")
		age = age + "+";
	queryRes.SelectPlatforms2Query(operation, platform1, platform2, offset, limit, orderBy, order, title, director, language, genre, year, country, age, (err, data) => {
		if (err) {
			res.status(400).send('Bad Request');
		}
		else {
			if (!data.length) {
				res.statusMessage = "No Data";
				res.status(403).send('No Data');
			}
			else {
					res.json(data);
			}
		}

	});
}

exports.SelectPlatforms3 = (req, res) => {
	if (req.params.operation != "and" && req.params.operation != "or") {
		res.status(400).send('Bad Request');
	}
	const operation = req.params.operation;
	const platform1 = req.params.platform1;
	const platform2 = req.params.platform2;
	const platform3 = req.params.platform3;
	let offset = req.query.offset;
	let limit = req.query.limit;
	let orderBy = req.query.orderBy;
	let order = req.query.order;
	let title = req.query.title;
	let director = req.query.director;
	let language = req.query.language;
	let genre = req.query.genre;
	let year = req.query.year;
	let country = req.query.country;
	let age = req.query.age;
	if (limit === undefined)
		limit = 18446744073709551;
	if (offset === undefined)
		offset = 0;
	if (orderBy === undefined)
		orderBy = "Title";
	if (order === undefined)
		order = "ASC";
	if (title === undefined)
		title = '';
	if (director === undefined)
		director = '';
	if (language === undefined)
		language = '';
	if (genre === undefined)
		genre = '';
	if (year === undefined)
		year = '';
	if (country === undefined)
		country = '';
	if (age === undefined)
		age = '';
	if (age == "7" || age == "13" || age == "16" || age == "18")
		age = age + "+";
	queryRes.SelectPlatforms3Query(operation, platform1, platform2, platform3, offset, limit, orderBy, order, title, director, language, genre, year, country, age, (err, data) => {
		if (err) {
			res.status(400).send('Bad Request');
		}
		else {
			if (!data.length) {
				res.statusMessage = "No Data";
				res.status(403).send('No Data');
			}
			else {
					res.json(data);
			}
		}

	});
}

exports.SelectPlatforms4 = (req, res) => {
	if (req.params.operation != "and" && req.params.operation != "or") {
		res.status(400).send('Bad Request');
	}
	const operation = req.params.operation;
	const platform1 = req.params.platform1;
	const platform2 = req.params.platform2;
	const platform3 = req.params.platform3;
	const platform4 = req.params.platform4;
	let offset = req.query.offset;
	let limit = req.query.limit;
	let orderBy = req.query.orderBy;
	let order = req.query.order;
	let title = req.query.title;
	let director = req.query.director;
	let language = req.query.language;
	let genre = req.query.genre;
	let year = req.query.year;
	let country = req.query.country;
	let age = req.query.age;
	if (limit === undefined)
		limit = 18446744073709551;
	if (offset === undefined)
		offset = 0;
	if (orderBy === undefined)
		orderBy = "Title";
	if (order === undefined)
		order = "ASC";
	if (title === undefined)
		title = '';
	if (director === undefined)
		director = '';
	if (language === undefined)
		language = '';
	if (genre === undefined)
		genre = '';
	if (year === undefined)
		year = '';
	if (country === undefined)
		country = '';
	if (age === undefined)
		age = '';
	if (age == "7" || age == "13" || age == "16" || age == "18")
		age = age + "+";
	queryRes.SelectPlatforms4Query(operation, platform1, platform2, platform3, platform4, offset, limit, orderBy, order, title, director, language, genre, year, country, age, (err, data) => {
		if (err) {
			res.status(400).send('Bad Request');
		}
		else {
			if (!data.length) {
				res.statusMessage = "No Data";
				res.status(403).send('No Data');
			}
			else {
					res.json(data);
			}
		}

	});
}

exports.SelectDirector = (req, res) => {
	const director = req.params.director;
	queryRes.SelectDirectorQuery(director, (err, data) => {
		if (err) {
			res.status(400).send('Bad Request');
		}
		else {
			if (!data.length) {
				res.statusMessage = "No Data";
				res.status(403).send('No Data');
			}
			else {
					res.json(data)
			}
		}

	});
}

exports.SelectCountry = (req, res) => {
	const country = req.params.country;
	queryRes.SelectCountryQuery(country, (err, data) => {
		if (err) {
			res.status(400).send('Bad Request');
		}
		else {
			if (!data.length) {
				res.statusMessage = "No Data";
				res.status(403).send('No Data');
			}
			else {
					res.json(data)
			}
		}

	});
}

exports.SelectLanguage = (req, res) => {
	const language = req.params.language;
	queryRes.SelectLanguageQuery(language, (err, data) => {
		if (err) {
			res.status(400).send('Bad Request');
		}
		else {
			if (!data.length) {
				res.statusMessage = "No Data";
				res.status(403).send('No Data');
			}
			else {
					res.json(data)
			}
		}

	});
}

exports.SelectYear = (req, res) => {
	const year = req.params.year;
	queryRes.SelectYearQuery(year, (err, data) => {
		if (err) {
			res.status(400).send('Bad Request');
		}
		else {
			if (!data.length) {
				res.statusMessage = "No Data";
				res.status(403).send('No Data');
			}
			else {
					res.json(data)
			}
		}

	});
}

exports.SelectRuntime = (req, res) => {
	const runtime = req.params.runtime;
	queryRes.SelectRuntimeQuery(runtime, (err, data) => {
		if (err) {
			res.status(400).send('Bad Request');
		}
		else {
			if (!data.length) {
				res.statusMessage = "No Data";
				res.status(403).send('No Data');
			}
			else {
					res.json(data)
			}
		}

	});
}

exports.SelectAge = (req, res) => {
	const age = req.params.age;
	queryRes.SelectAgeQuery(age, (err, data) => {
		if (err) {
			res.status(400).send('Bad Request');
		}
		else {
			if (!data.length) {
				res.statusMessage = "No Data";
				res.status(403).send('No Data');
			}
			else {
					res.json(data)
			}
		}

	});
}

exports.SelectIMDbScore = (req, res) => {
	const imdb = req.params.imdb;
	queryRes.SelectIMDbScoreQuery(imdb, (err, data) => {
		if (err) {
			res.status(400).send('Bad Request');
		}
		else {
			if (!data.length) {
				res.statusMessage = "No Data";
				res.status(403).send('No Data');
			}
			else {
					res.json(data)
			}
		}

	});
}

exports.SelectRottenScore = (req, res) => {
	const rotten = req.params.rotten;
	queryRes.SelectRottenScoreQuery(rotten, (err, data) => {
		if (err) {
			res.status(400).send('Bad Request');
		}
		else {
			if (!data.length) {
				res.statusMessage = "No Data";
				res.status(403).send('No Data');
			}
			else {
					res.json(data)
			}
		}

	});
}

exports.SelectGenre = (req, res) => {
	const genre = req.params.genre;
	queryRes.SelectGenreQuery(genre, (err, data) => {
		if (err) {
			res.status(400).send('Bad Request');
		}
		else {
			if (!data.length) {
				res.statusMessage = "No Data";
				res.status(403).send('No Data');
			}
			else {
					res.json(data)
			}
		}

	});
}
