\c goalhive_app

-- Seed data for user_account table
INSERT INTO user_accounts (username, email, password_hash,)
VALUES
    ('johnhenry', 'johnhenry@yahoo.com', 'AB@hash123'),
    ('alicesmith', 'alicesmith@msn.com', 'Q@pass456'),
    ('michaelj', 'michael@gmail.com', 'P!pwd789'),
    ('scarlettbourd', 'scarlett@hotmail.com', 'b@aAuty9810'),
    ('louiscartman', 'louiscartman@aol.com', 'Space@341'),
    ('samanthacollins', 'samanthacol@yahoo.com', 'g@rdeN44');

-- Seed data for user_profile table
INSERT INTO user_profiles (firstname, lastname, user_profile_img, age, gender, bio, last_login, active_status, user_account_id)
VALUES 
    ('John', 'Lewis', '', 25, 'male', 'Passionate about fitness and health', '2024-02-28 15:00:00', 'active', 1),
    ('Alice', 'Smith', '', 28, 'female', 'Enthusiastic learner and traveler', '2024-02-27 10:30:00', 'active', 2),
    ('Michael', 'Johnson', '', 39, 'male', 'Art lover and nature enthusiast', '2024-02-26 12:45:00', 'active', 3),
    ('Scarlett', 'Bourdeoux', '', 34, 'female', 'Learning a language in a foreign country', '2024-02-25 11:20:00', 'active', 4),
    ('Louis', 'Cartman', '', 49, 'male', 'Avid swimmer at all times', '2024-02-24 09:15:00', 'active', 5),
    ('Samantha', 'Collins', '', 50, 'female', 'Love to take care of my garden', '2024-02-23 08:00:00', 'active', 6);

-- Seed data for interests table
INSERT INTO interests (interest_name)
VALUES
    ('Fitness'),
    ('Traveling'),
    ('Art'),
    ('Language'),
    ('Swimming'),
    ('Gardening');

-- Seed data for goals table
INSERT INTO goals (user_account_id, partner_user_id, goal_name, goal_description, target_date, meeting_frequency_preference, goal_length_preference, creater_progress, partner_progress, interest_id)
VALUES
    (1, 2, 'Lose 10 pounds', 'Want to get in better shape before summer', '2024-06-30', 'Weekly', '3 months', 0, 0, 1),
    (2, 1, 'Learn Spanish', 'Planning a trip to Spain next year', '2025-01-01', 'Daily', '1 year', 0, 0, 2),
    (3, 4, 'Visit 3 new countries', 'Exploring new cultures and cuisines', '2024-12-31', 'Monthly', '1 year', 0, 0, 3),
    (2, 3, 'Learn to play guitar', 'Mastering a new musical instrument', '2024-10-01', 'Weekly', '1 year', 0, 0, 2),
    (1, 5, 'Start a blog', 'Sharing insights and experiences with the world', '2025-01-01', 'Monthly', '2 years', 0, 0, 1),
    (3, 1, 'Complete a marathon', 'Training for a full marathon', '2024-11-15', 'Weekly', '6 months', 0, 0, 3);

-- Seed data for interest_connection table
INSERT INTO interest_connections (interest_id, user_profile_id)
VALUES
    (1, 1),
    (2, 2),
    (3, 3),
    (4, 4),
    (5, 5),
    (6, 6);

-- Seed data for connection_request table
INSERT INTO connection_requests (sender_id, receiver_id, status, timestamp)
VALUES
    (1, 2, 'Pending', '2024-02-29 10:00:00'),
    (2, 1, 'Accepted', '2024-02-26 14:00:00'),
    (3, 1, 'Rejected', '2024-03-01 16:30:00'),
    (4, 6, 'Pending',  '2024-02-29 10:00:00'),
    (3, 5, 'Accepted', '2024-02-26 14:00:00'),
    (5, 6, 'Rejected', '2024-03-01 16:30:00');