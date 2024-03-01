DROP DATABASE IF EXISTS goalhive_dev;
CREATE DATABASE goalhive_dev;
\c goalhive_dev;
CREATE TABLE user_profile
(
    user_profile_id SERIAL PRIMARY KEY,
    username VARCHAR NOT NULL,
    firstname VARCHAR,
    lastname VARCHAR,
    email VARCHAR(255) NOT NULL UNIQUE,
    user_profile_img VARCHAR(255),
    age INTEGER,
    gender VARCHAR,
    bio VARCHAR(255),
    password_hash VARCHAR(255) NOT NULL
);
CREATE TABLE interest (
    interest_id SERIAL PRIMARY KEY,
    interest_name TEXT
);
CREATE TABLE goals (
    goal_id SERIAL PRIMARY KEY,
    FOREIGN KEY (creater_user_id) REFERENCES user_profile(user_profile_id),
    FOREIGN KEY (partner_user_id) REFERENCES user_profile(user_profile_id),
    goal_description VARCHAR(255),
    target_date DATE,
    creater_progress INTEGER,
    partner_progress INTEGER, 
    FOREIGN KEY (interest_id) REFERENCES interest(interest_id)
);
CREATE TABLE interest_connection (
    interest_connection_id SERIAL PRIMARY KEY,
    interest_id INTEGER REFERENCES interest(interest_id),
    user_id INTEGER REFERENCES user_profile(user_profile_id)
);
CREATE TABLE connection_request (
    request_id SERIAL PRIMARY KEY,
    sender_id INTEGER REFERENCES user_profile(user_profile_id),
    receiver_id INTEGER REFERENCES user_profile(user_profile_id),
    status TEXT,
    last_login TIMESTAMP
);
