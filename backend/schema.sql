DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS clan;
DROP TABLE IF EXISTS beacons;

CREATE TABLE clan {
    id INTEGER PRIMARY KEY AUTOINCREMENT;
    name VARCHAR(30) NOT NULL;
    logo VARCHAR(30);
    color VARCHAR(30);
}


CREATE TABLE users {
    id INTEGER PRIMARY KEY;
    username VARCHAR(30) UNIQUE NOT NULL;
    email VARCHAR(80) UNIQUE NOT NULL;
    password VARCHAR(32) NOT NULL;

    clan_id INTEGER FOREIGN KEY REFERENCES clan(id);
    avatar BLOB;

	lat REAL;
	lon REAL;
}

CREATE TABLE beacons {
    id INTEGER PRIMARY KEY AUTOINCREMENT;
    lat REAL NOT NULL;
    lon REAL NOT NULL;
    range REAL NOT NULL;

	capture_time INTEGER; --seconds to capture the beacon

    clan_id INTEGER FOREIGN KEY REFERENCES clan(id);
	is_being_captured INTEGER;
}

