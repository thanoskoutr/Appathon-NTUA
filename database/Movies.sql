CREATE TABLE Movies (
  Count           INT(11) NOT NULL,
  ID              INT(11) NOT NULL,
  Title           VARCHAR(255),
  Year            INT(4),
  Age             VARCHAR(255),
  IMDb            VARCHAR(255),
  Rotten_Tomatoes VARCHAR(255),
  Netflix         TINYINT(1) NOT NULL,
  Hulu            TINYINT(1) NOT NULL,
  Prime_Video     TINYINT(1) NOT NULL,
  Disney          TINYINT(1) NOT NULL,
  Directors       VARCHAR(255),
  Genres          VARCHAR(255),
  Country         VARCHAR(255),
  Language        VARCHAR(255),
  Runtime         INT(11),
  PRIMARY KEY (ID)
);
