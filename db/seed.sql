\c goalhive_app

-- Seed data for the user_profiles table
INSERT INTO user_profiles (username, email, password_hash, firstname, lastname, profile_img, age, gender, bio)
VALUES
    ('John99', 'john99@hotmail.com', 'hashed_password1', 'John', 'Hank', 'profile1.jpg', 25, 'Male', 'Bio for user1'),
    ('Jane94', 'jane94@gmail.com', 'hashed_password2', 'Jane', 'Smith', 'profile2.jpg', 30, 'Female', 'Bio for user2'),
    ('Samantha79', 'Samantha@aol.com', 'hashed_password3', 'Samantha', 'Johnson', NULL, 45, 'Female', NULL),
    ('Tyshawn74', 'Tyshawn@yahoo.com', 'password4444', 'TyShawn', 'Wright', NULL, 50, 'Male', NULL);

-- Seed data for the interests table
INSERT INTO interests (name)
VALUES
    ('Tech'),
    ('Hiking'),
    ('Photography'),
    ('Gardening'),
    ('Traveling'),
    ('Health'),
    ('Fitness'),
    ('Finance'),
    ('Art'),
    ('Music');

-- Seed data for the goals table
INSERT INTO goals (name, description, target_date, created_at, user_profile_id,interests_id )
VALUES
    ('Learn Web Development', 'Complete a web development course', '2024-12-31', CURRENT_TIMESTAMP, 1, 1),
    ('Hike a Mountain', 'Reach the summit of a challenging mountain', '2024-08-15', CURRENT_TIMESTAMP, 2, 2),
    ('Start a Photography Blog', 'Share photography experiences and tips', '2024-10-01', CURRENT_TIMESTAMP, 1, 3),
    ('Indoor Food Gardening', 'Grow vegetables and herbs in my apartment', '2024-9-01', CURRENT_TIMESTAMP, 4, 4),
    ('Lose Excess Skin', 'Tighten up the extra skin around my arms and legs', '2024-8-21', CURRENT_TIMESTAMP, 3, 6);

INSERT INTO interest_connections(user_profile_id, interest_id)
VALUES
    (1,1),
    (1,3),
    (2,2),
    (2,5),
    (3,3),
    (3,6),
    (4,1),
    (4,3),
    (4,4);

INSERT INTO connection_requests (sender_user_profile_id, receiver_user_profile_id, status, timestamp)
VALUES
    (1, 2, 'accepted', CURRENT_TIMESTAMP),
    (3, 1, 'pending', CURRENT_TIMESTAMP),
    (2, 3, 'accepted', CURRENT_TIMESTAMP),
    (4, 1, 'pending', CURRENT_TIMESTAMP);