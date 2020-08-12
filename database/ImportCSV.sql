LOAD DATA LOCAL INFILE '~/Documents/Internet-and-Applications_8th-semester/database/MoviesOnStreamingPlatforms.csv'
INTO TABLE Movies
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS (@Count, ID, Title, Year, Age, IMDb, Rotten_Tomatoes, Netflix, Hulu, Prime_Video, Disney, @Type, Directors, Genres, Country, Language, Runtime);
