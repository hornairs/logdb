USE logdb_development;
LOAD DATA LOCAL INFILE 'mbdump/url' INTO TABLE `url`
FIELDS TERMINATED BY '\t' ENCLOSED BY '' ESCAPED BY '\\'
LINES TERMINATED BY '\n' STARTING BY '';