DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS clan;
DROP TABLE IF EXISTS beacons;

CREATE TABLE clan (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(30) NOT NULL,
    logo VARCHAR(30),
    color VARCHAR(6)
);


CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    username VARCHAR(30) UNIQUE NOT NULL,
    email VARCHAR(80) UNIQUE NOT NULL,
    password VARCHAR(32) NOT NULL,

    clan_id INTEGER,
    avatar BLOB,

	lat REAL,
	lon REAL,

	FOREIGN KEY (clan_id) REFERENCES clan(id)
);

CREATE TABLE beacons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lat REAL NOT NULL,
    lon REAL NOT NULL,
    range REAL NOT NULL,

	capture_time INTEGER, --seconds to capture the beacon

    clan_id INTEGER,
	is_being_captured INTEGER default 0,

	FOREIGN KEY (clan_id) REFERENCES clan(id)
);

INSERT INTO beacons(lat, lon, range, capture_time)
VALUES 
(56.2221, 57.3211, 5, 60),
(56.2221, 57.3221, 10, 70),
(56.2221, 57.3231, 15, 80);

