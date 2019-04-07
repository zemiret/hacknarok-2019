DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS clans;
DROP TABLE IF EXISTS beacons;

CREATE TABLE clans (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(30) NOT NULL,
    color VARCHAR(6),
    avatar BLOB
);

CREATE TABLE beacons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lat REAL NOT NULL,
    lon REAL NOT NULL,
    range REAL NOT NULL,

	capture_time INTEGER, --seconds to capture the beacon

    clan_id INTEGER NULL,
	is_being_captured INTEGER default 0,

	FOREIGN KEY (clan_id) REFERENCES clans(id)
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

	beacon_id INTEGER,

	FOREIGN KEY (clan_id) REFERENCES clans(id)
	FOREIGN KEY (beacon_id) REFERENCES beacons(id)
);



INSERT INTO beacons(lat, lon, range, capture_time)
VALUES 
(50.018108999999995, 19.8819536, 20, 1),
(50.018288999999995, 19.8821336, 20, 1),
(50.018288999999995, 19.8817736, 20, 1),
(50.017928999999995, 19.8817736, 20, 1),
(50.017928999999995, 19.8821336, 20, 1),
(50.018108999999995, 19.8823136, 20, 1),
(50.018108999999995, 19.8815936, 20, 1);

INSERT INTO clans (name,color) VALUES('Sleipnir','00ff00');
INSERT INTO clans (name,color) VALUES('Programisci','ff0000');
INSERT INTO clans (name,color) VALUES('Inni','0000ff');

INSERT INTO users (username,email,password,clan_id) VALUES('Szymon','szymon@gmail.com','password1234',1);
INSERT INTO users (username,email,password,clan_id) VALUES('Szymi','szymi@gmail.com','password1234',1);
INSERT INTO users (username,email,password,clan_id) VALUES('Filip','filip@gmail.com','password1234',1);
INSERT INTO users (username,email,password,clan_id) VALUES('Antek','antek@gmail.com','password1234',1);

INSERT INTO users (username,email,password,clan_id) VALUES('Jednorożec1','j1@gmail.com','j11234',2);
INSERT INTO users (username,email,password,clan_id) VALUES('Jednorożec2','j2@gmail.com','j21234',2);
INSERT INTO users (username,email,password,clan_id) VALUES('Jednorożec3','j3@gmail.com','j31234',2);

INSERT INTO users (username,email,password) VALUES('Jednorożec4','j4@gmail.com','j31234');

