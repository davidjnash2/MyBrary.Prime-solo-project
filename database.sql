-- database name: library_solo_project

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

-- create avatar table
CREATE TABLE "avatar" (
	"id" SERIAL PRIMARY KEY,
	"img" VARCHAR(1000) NOT NULL
);

-- create user table
CREATE TABLE "user" (
	"id" SERIAL PRIMARY KEY,
	"username" VARCHAR(80) UNIQUE NOT NULL,
	"password" VARCHAR(1000) NOT NULL,
	"avatar_id" INT REFERENCES "avatar"
);

-- create book table without quotation formatting
-- using INTEGER for published date, as DATE was causing errors from inconsistent date formatting
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

-- creating user_book table
-- including entry timestamp for sorting
-- rating column to varchar, input restrictions on client side
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
-- braces and quotes with data entries, so below two queries will
-- run as part of library GET, to ensure data comes back formatted correclty
UPDATE book
SET author = replace(replace(replace(author, '{', ''), '}', ''), '"', '');

UPDATE book
SET genre = replace(replace(replace(genre, '{', ''), '}', ''), '"', '');
