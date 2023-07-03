-- database name: library_solo_project

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

-- all following statements are to create test databse 
-- for "mybrary" solo project, to ensure intended functionality

-- creating test avatar table
CREATE TABLE "avatar" (
	"id" SERIAL PRIMARY KEY,
	"img" VARCHAR(1000) NOT NULL
);

-- creating test user table
CREATE TABLE "user" (
	"id" SERIAL PRIMARY KEY,
	"username" VARCHAR(80) UNIQUE NOT NULL,
	"password" VARCHAR(1000) NOT NULL,
	"avatar_id" INT REFERENCES "avatar"
);

-- creating test book table, testing without quotation formatting
-- using INTEGER for publised date, as DATE was causing errors from 
-- inconsistent date formatting
CREATE TABLE book (
	id SERIAL PRIMARY KEY,
	cover_url VARCHAR(500),
	title VARCHAR(1000) NOT NULL,
	subtitle VARCHAR(2000),
	author VARCHAR(500) NOT NULL,
	publisher VARCHAR(500),
	published VARCHAR,
	genre VARCHAR(255),
	pages INTEGER,
	description TEXT,
	isbn VARCHAR(13) NOT NULL
);

-- creating test user_book table
-- changing formatting to include entry timestamp for later sorting purposes
-- added value constraints on rating column; nope removed those
-- updated rating column to varchar, will have input restrictions on client side, instead
CREATE TABLE user_book (
	id SERIAL PRIMARY KEY,
	user_id INT REFERENCES "user"(id),
	book_id INT REFERENCES book (id),
	read_status BOOLEAN DEFAULT FALSE,
	rating VARCHAR,
	review TEXT,
	borrowed BOOLEAN DEFAULT FALSE,
	borrowed_date DATE,
	borrower VARCHAR(255),
	time_added TIMESTAMP DEFAULT NOW()
);


-- author and genre columns in book table have started including curly
-- braces and quotes with data entries, so below two queries are to be run
-- sporadically/at end to remove those values

-- perhaps there's a way to *saftely* include those queries as part of a get??? but don't want
-- to include something so potentially destructive in a regularly-occuring function juuuust yet
UPDATE book
SET author = replace(replace(replace(author, '{', ''), '}', ''), '"', '');

UPDATE book
SET genre = replace(replace(replace(genre, '{', ''), '}', ''), '"', '');
