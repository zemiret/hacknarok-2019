DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS clans;
DROP TABLE IF EXISTS beacons;

CREATE TABLE clans (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(30) NOT NULL,
    color VARCHAR(6),
    sign BLOB
);


CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    username VARCHAR(30) UNIQUE NOT NULL,
    email VARCHAR(80) UNIQUE NOT NULL,
    password VARCHAR(32) NOT NULL,

    clan_id INTEGER FOREIGN KEY REFERENCES clan(id),
    avatar BLOB,

	lat REAL,
	lon REAL
);

CREATE TABLE beacons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lat REAL NOT NULL,
    lon REAL NOT NULL,
    range REAL NOT NULL,

	capture_time INTEGER, --seconds to capture the beacon

    clan_id INTEGER FOREIGN KEY REFERENCES clan(id),
	is_being_captured INTEGER,
);

INSERT INTO clans (name,color,occupied_territory_in_procent) VALUES('Sleipnir','FFCCDD');
INSERT INTO clans (name,color,occupied_territory_in_procent) VALUES('Programisci','000000');
INSERT INTO clans (name,color,occupied_territory_in_procent) VALUES('Inni','3366cc';

INSERT INTO users (username,email,password,clan_id) VALUES('Szymon','szymon@gmail.com','password1234',1);
INSERT INTO users (username,email,password,clan_id) VALUES('Szymi','szymi@gmail.com','password1234',1);
INSERT INTO users (username,email,password,clan_id) VALUES('Filip','filip@gmail.com','password1234',1);
INSERT INTO users (username,email,password,clan_id) VALUES('Antek','antek@gmail.com','password1234',1);

INSERT INTO users (username,email,password,clan_id) VALUES('Jednorożec1','j1@gmail.com','j11234',2);
INSERT INTO users (username,email,password,clan_id) VALUES('Jednorożec2','j2@gmail.com','j21234',2);
INSERT INTO users (username,email,password,clan_id) VALUES('Jednorożec3','j3@gmail.com','j31234',2);
