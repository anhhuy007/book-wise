CREATE TABLE Book (
    id varchar,
    title nvarchar,
    author_name nvarchar,
    published_year integer,
    page_count integer,
    category varchar, -- list of id  
    language varchar,
    view_count integer, 
    avg_rating float,
    rating_count integer, 
    img_url varchar,
    preview_url varchar, 
    description text  
)

CREATE TABLE Account (
    id serial, 
    email varchar, 
    password varchar, 
    created_at varchar  
)

CREATE TABLE AccountInfo (
    id serial, 
    user_name varchar, 
    avatar_url varchar, 
    gender boolean, 
    dob date,
    university varchar, 
    faculty varchar
)

CREATE TABLE UserPreferences (
    account_id integer, 
    favourite_books varchar, -- book id
    reading_goal varchar, 
    interested_categories varchar,
    book_criteria varchar
)

CREATE TABLE Category (
    id serial, 
    name varchar, 
    description text, 
    view_count integer
)

CREATE TABLE CategoryView (
    category_id integer, 
    user_id integer, 
    view_count integer
)

CREATE TABLE BookView (
    book_id integer,
    user_id integer, 
    view_count integer
)

CREATE TABLE Rating (
    book_id integer, 
    user_id integer, 
    rating float, 
    created_at timestamp
)

CREATE TABLE FavouriteBook (
    id serial, 
    book_id integer,
    user_id integer, 
    created_at timestamp
)

