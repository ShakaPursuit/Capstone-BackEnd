DROP DATABASE IF EXISTS goalhive_app;
CREATE DATABASE goalhive_app;
\c goalhive_app;

CREATE TABLE user_accounts (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE user_profiles (
    user_profile_id SERIAL PRIMARY KEY,
    firstname VARCHAR,
    lastname VARCHAR,
    user_profile_img VARCHAR(255),
    age INTEGER,
    gender VARCHAR,
    bio VARCHAR(255),
    last_login TIMESTAMP,
    active_status VARCHAR DEFAULT 'active'
);

CREATE TABLE interests (
    interest_id SERIAL PRIMARY KEY,
    interest_name TEXT
);

CREATE TABLE goals (
    goal_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES user_accounts(user_id),
    partner_user_id INTEGER REFERENCES user_profiles(user_profile_id),
    goal_name VARCHAR(50),
    goal_description VARCHAR(255),
    target_date DATE,
    meeting_frequency_preference VARCHAR(255),
    goal_length_preference VARCHAR(255),
    creater_progress INTEGER,
    partner_progress INTEGER,
    interest_id INTEGER REFERENCES interests(interest_id)
);

CREATE TABLE interest_connections (
    interest_connection_id SERIAL PRIMARY KEY,
    interest_id INTEGER REFERENCES interests(interest_id),
    user_profile_id INTEGER REFERENCES user_profiles(user_profile_id)
);

CREATE TABLE connection_requests (
    request_id SERIAL PRIMARY KEY,
    sender_id INTEGER REFERENCES user_profiles(user_profile_id),
    receiver_id INTEGER REFERENCES user_profiles(user_profile_id),
    status TEXT,
    timestamp TIMESTAMP
);