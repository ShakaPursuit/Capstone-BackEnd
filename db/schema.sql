DROP DATABASE IF EXISTS goalhive_app;
CREATE DATABASE goalhive_app;
\c goalhive_app;

-- Creating user_accounts table with profile_id, but have removed the foreign key constraint until user_profiles table is created
CREATE TABLE user_accounts (
    id SERIAL PRIMARY KEY,
    username VARCHAR(15) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    profile_id INTEGER -- Removed foreign key constraint to be added after user_profiles table is created
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
    account_id INTEGER REFERENCES user_accounts(id) ON DELETE CASCADE
);

-- Add the foreign key constraint to the user_accounts table.
ALTER TABLE user_accounts
ADD CONSTRAINT fk_user_accounts_profile_id FOREIGN KEY (profile_id) REFERENCES user_profiles(id) ON DELETE CASCADE;

-- Update user_accounts to set profile_id based on existing values in user_profiles.
UPDATE user_accounts
SET profile_id = user_profiles.id
FROM user_profiles
WHERE user_accounts.id = user_profiles.account_id;


CREATE TABLE interests (
    id SERIAL PRIMARY KEY,
    interest_name TEXT
);

CREATE TABLE goals (
    id SERIAL PRIMARY KEY,
    goal_profile_id INTEGER REFERENCES user_profiles(id),
    partner_id INTEGER REFERENCES user_profiles(id),
    name VARCHAR(50),
    description VARCHAR(255),
    target_date DATE,
    meeting_frequency_preference VARCHAR(255),
    goal_length_preference VARCHAR(255),
    creater_progress INTEGER,
    partner_progress INTEGER,
    interest_id INTEGER REFERENCES interests(id)
);

CREATE TABLE interest_connections (
    id SERIAL PRIMARY KEY,
    interest_connect_id INTEGER REFERENCES interests(id),
    profile_connect_id INTEGER REFERENCES user_profiles(id)
);

CREATE TABLE connection_requests (
    id SERIAL PRIMARY KEY,
    sender_id INTEGER REFERENCES user_profiles(id),
    receiver_id INTEGER REFERENCES user_profiles(id),
    status TEXT,
    timestamp TIMESTAMP
);