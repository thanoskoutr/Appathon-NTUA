LOAD DATA LOCAL INFILE '~/Documents/Internet-and-Applications_8th-semester/database/MoviesOnStreamingPlatforms.csv'
INTO TABLE Movies
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS (Count, ID, Title, Year, Age, IMDb, Rotten_Tomatoes, Netflix, Hulu, Prime_Video, Disney, @Type, Directors, Genres, Country, Language, Runtime);

UPDATE Movies SET Age = NULL where Age = "";
UPDATE Movies SET IMDb = NULL where IMDb = "";
UPDATE Movies SET Rotten_Tomatoes = NULL where Rotten_Tomatoes = "";
UPDATE Movies SET Directors = NULL where Directors = "";
UPDATE Movies SET Genres = NULL where Genres = "";
UPDATE Movies SET Country = NULL where Country = "";
UPDATE Movies SET Language = NULL where Language = "";
UPDATE Movies SET Runtime = NULL where Runtime = "";
