DROP DATABASE IF EXISTS goalhive_app;
CREATE DATABASE goalhive_app;
\c goalhive_app;


CREATE TABLE user_accounts (
    id SERIAL PRIMARY KEY,
    username VARCHAR(15) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    profile_id INTEGER 
);

CREATE TABLE user_profiles (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR,
    lastname VARCHAR,
    user_profile_img VARCHAR(255),
    age INTEGER,
    gender VARCHAR,
    bio VARCHAR(255),
    last_login TIMESTAMP,
    active_status VARCHAR DEFAULT 'active',
    account_id INTEGER REFERENCES user_accounts (id) ON DELETE CASCADE
);
 CREATE TABLE interests (
    id SERIAL PRIMARY KEY,
     interest_name TEXT,
     interest_connect_id INTEGER REFERENCES user_accounts (id) 
 );

CREATE TABLE goals (
   id SERIAL PRIMARY KEY,
     goal_profile_id INTEGER REFERENCES user_accounts (id),
     partner_id INTEGER REFERENCES user_accounts (id),
     goal_name VARCHAR(50),
    goal_description VARCHAR(255),
     target_date DATE,
     meeting_frequency_preference VARCHAR(255),
     goal_length_preference VARCHAR(255),
     creater_progress INTEGER,
     partner_progress INTEGER,
     interest_id INTEGER REFERENCES interests (id)
 );
 CREATE TABLE interest_connections (
   id SERIAL PRIMARY KEY,
     interest_connect_id INTEGER REFERENCES interests (id),
     profile_connect_id INTEGER REFERENCES user_profiles (id)
 );

 CREATE TABLE connection_requests (
    id SERIAL PRIMARY KEY,
     sender_id INTEGER REFERENCES user_profiles (id),
     receiver_id INTEGER REFERENCES user_profiles (id),
     status TEXT,
     timestamp TIMESTAMP
 );
