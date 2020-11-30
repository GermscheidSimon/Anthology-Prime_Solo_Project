
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "songs" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(256),
    "album" VARCHAR(256),
    "artist" VARCHAR(256),
    "user_id" INT REFERENCES "user"
);

CREATE TABLE "songs_playlists" (
    "id" SERIAL PRIMARY KEY,
    "playlists_id" INT REFERENCES "playlists",
    "songs_id" INT REFERENCES "songs",
);

CREATE TABLE "playlists" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(32)
);