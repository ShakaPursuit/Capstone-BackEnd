DROP DATABASE IF EXISTS goalhive_app;

CREATE DATABASE goalhive_app;


\c goalhive_app
CREATE TABLE user_profiles
(
    userprofile_id SERIAL PRIMARY KEY,
    username VARCHAR(25) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    firstname VARCHAR(50) DEFAULT NULL,
    lastname VARCHAR(50) DEFAULT NULL,
    profile_img VARCHAR(100) DEFAULT NULL,
    age INTEGER DEFAULT NULL,
    gender VARCHAR(10) DEFAULT NULL,
    bio VARCHAR(255) DEFAULT NULL
);

CREATE TABLE interests
(
    interest_id SERIAL PRIMARY KEY,
    name TEXT
);

CREATE TABLE goals
(
    goal_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(255) DEFAULT NULL,
    target_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- user1_prgress INTEGER DEFAULT NULL, 
    -- user2_prgress INTEGER DEFAULT NULL,
    userprofile_id INTEGER REFERENCES user_profiles(userprofile_id) ON DELETE CASCADE,
    interest_id INTEGER REFERENCES interests(interest_id)
);

CREATE TABLE interest_connections
(
    userprofile_id INTEGER REFERENCES user_profiles(userprofile_id),
    interest_id INTEGER REFERENCES interests(interest_id)
);

CREATE TABLE connection_requests
(
    connectionrequests_id SERIAL PRIMARY KEY,
    sender_user_profile_id INTEGER REFERENCES user_profiles(userprofile_id),
    receiver_user_profile_id INTEGER REFERENCES user_profiles(userprofile_id),
    status TEXT,
    timestamp TIMESTAMP
);

CREATE TABLE posts
(
    post_id SERIAL PRIMARY KEY,
    userprofile_id INTEGER REFERENCES user_profiles(userprofile_id),
    post_content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE comments
(
    comment_id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES post(post_id),
    userprofile_id INTEGER REFERENCES user_profiles(userprofile_id),
    comment_content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE likes
(
    like_id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES post(post_id),
    userprofile_id INTEGER REFERENCES user_profiles(userprofile_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
