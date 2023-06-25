-- database name: library_solo_project
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);




--all following statements are to create test databse 
--for "mybrary" solo project, to ensure intended functionality

--creating test avatar table
CREATE TABLE "avatar" (
	"id" SERIAL PRIMARY KEY,
	"img" VARCHAR(1000) NOT NULL
);

--creating test user table
CREATE TABLE "user" (
	"id" SERIAL PRIMARY KEY,
	"username" VARCHAR(80) UNIQUE NOT NULL,
	"password" VARCHAR(1000) NOT NULL,
	"avatar_id" INT REFERENCES "avatar"
);

--creating test book table, testing without quotation formatting
CREATE TABLE book (
	id SERIAL PRIMARY KEY,
	cover_url VARCHAR(500),
	title VARCHAR(1000) NOT NULL,
	subtitle VARCHAR(2000),
	author VARCHAR(500) NOT NULL,
	publisher VARCHAR(500),
	published DATE,
	genre VARCHAR(255),
	pages INTEGER,
	description TEXT,
	isbn INTEGER UNIQUE NOT NULL
);


--creating test user_book table
CREATE TABLE user_book (
	id SERIAL PRIMARY KEY,
	user_id INT REFERENCES "user"(id),
	book_id INT REFERENCES book (id),
	read_status BOOLEAN DEFAULT FALSE,
	rating INT,
	review TEXT,
	borrowed BOOLEAN DEFAULT FALSE,
	borrowed_date DATE,
	borrower VARCHAR(255)
);



