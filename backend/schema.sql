DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS clans;
DROP TABLE IF EXISTS beacons;

CREATE TABLE clans{
    id INTEGER PRIMARY KEY AUTOINCREMENT;
    name VARCHAR(30) NOT NULL;
    logo VARCHAR(30);
    color VARCHAR(30);
}


CREATE TABLE users{
    id INTEGER PRIMARY KEY;
    username VARCHAR(30) UNIQUE NOT NULL;
    email VARCHAR(40) UNIQUE NOT NULL;
    password VARCHAR(20) NOT NULL;
    clan_id INTEGER;
    picture VARCHAR(30);


    FOREIGN KEY (clan_id) REFERENCES clan (id)
}

CREATE TABLE beacons{
    id INTEGER PRIMARY KEY AUTOINCREMENT;
    middle_point_x INTEGER NOT NULL;
    middle_point_y INTEGER NOT NULL;
    range INTEGER NOT NULL;
    clan_id INTEGER;

    FOREIGN KEY (clan_id) REFERENCES clan (id)
}