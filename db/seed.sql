\c goalhive_app

-- Seed data for the user_profiles table
INSERT INTO user_profiles (username, email, password_hash, firstname, lastname, profile_img, age, gender, bio)
VALUES
    ('John54', 'john54@example.com', 'hashed_password01', 'John', 'Doe', 'profile001.png', 25, 'male', 'Bio for John54'),
('Jane', 'Jane@example.com', 'hashed_password02', 'Jane', 'Smith', 'profile002.png', 30, 'Female', 'Bio for Jane'),
('Samantha95', 'Samantha95@example.com', 'hashed_password03', 'Samantha', 'Johnson', 'profile003.png', 28, 'male', NULL),
('TyShawn9', 'TyShawn9@example.com', 'hashed_password04', 'TyShawn', 'Wright', 'profile004.png', 28, 'male', 'This is the bio for Tyshawn'),
('Denisthemenace', 'dmenace@aol.com', 'hashed_password05', 'Denis', 'Menais', 'profile005.png', 41, '', 'Bio info for Denis'),
('Tamara357', 'tamara@oaktown357.com', 'hashed_password06', 'Tamara', 'Jackson', 'profile006.png', 37, 'female', 'Bio info for Tamara'),
('mbrown', 'michaelbrown@pursuit.org', 'hashed_password07', 'Michael', 'Brown', 'profile007.png', 29, 'male', 'Bio info for Michael'),
('llettings', 'lisalettings@aol.com', 'hashed_password08', 'Lisa', 'Lettings', 'profile008.png', 23, 'female', 'Bio info for Lisa'),
('patTcake', 'pmoncake@email.com', 'hashed_password09', 'Pat', 'Moncake', 'profile009.png', 33, '', 'Bio info for Pat'),
('topofdarock', 'rockybordino@gmail.com', 'hashed_password10', 'Rocky', 'Bordino', 'profile010.png', 45, 'male', 'Bio info for Rocky');

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
    ('Crypto'),
    ('Art'),
    ('Music');

-- Seed data for the goals table
INSERT INTO goals (name, description, target_date, created_at, userprofile_id, interest_id )
VALUES
    ('Learn Web Development', 'Complete a web development course', '2024-12-31', CURRENT_TIMESTAMP, 1, 1),
    ('Hike a Mountain', 'Reach the summit of a challenging mountain', '2024-08-15', CURRENT_TIMESTAMP, 2, 2),
    ('Start a Photography Blog', 'Share photography experiences and tips', '2024-10-01', CURRENT_TIMESTAMP, 1, 3),
    ('Indoor Food Gardening', 'Grow vegetables and herbs in my apartment', '2024-9-01', CURRENT_TIMESTAMP, 4, 4),
    ('Lose Excess Skin', 'Tighten up the extra skin around my arms and legs', '2024-8-21', CURRENT_TIMESTAMP, 3, 6),
    ('Learn Blockchain', 'Learn the fundamental basics of bitcoin and blockchain technology', '2024-7-5', CURRENT_TIMESTAMP, 3, 9),
    ('Gardening for dummies course', 'They offer a class at the local lgbt center', '2024-8-24', CURRENT_TIMESTAMP, 1, 4),
    ('Weed our community garden', 'I need to try to weed our garden at least once a week this Spring', '2024-9-19', CURRENT_TIMESTAMP, 2, 4),
    ('Learn Python', 'I''m trying to learn Python for an upcoming project at work', '2024-6-5', CURRENT_TIMESTAMP, 4, 1), 
    ('SQL Course', 'Need to freshen up my sql skills for a job interview', '2024-5-28', CURRENT_TIMESTAMP, 2, 1);

INSERT INTO interest_connections(userprofile_id, interest_id)
VALUES
    (1, 1),
    (1, 3),
    (1, 4),
    (2, 4),
    (2, 1),
    (2, 2),
    (3, 6),
    (3, 9),
    (4, 4),
    (4, 1);

INSERT INTO connection_requests (sender_user_profile_id, receiver_user_profile_id, status, timestamp)
VALUES
    (1, 2, 'accepted', CURRENT_TIMESTAMP),
    (3, 1, 'pending', CURRENT_TIMESTAMP),
    (2, 1, 'accepted', CURRENT_TIMESTAMP),
    (4, 1, 'pending', CURRENT_TIMESTAMP),
    (4, 2, 'pending', CURRENT_TIMESTAMP),
    (2, 4, 'accepted', CURRENT_TIMESTAMP);