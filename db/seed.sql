\c goalhive_dev

-- Seed data for the user_profile table
INSERT INTO user_profile (username, firstname, lastname, email, user_profile_img, age, gender, bio, password_hash)
VALUES
   ('rboyce212', 'Rich', 'Boyce', 'rboyce212@gmail.com', '', 50, 'male', 'Bring the Wow!', '@Sslekfe1O40'),	
   ('GraceInYourFace', 'Grace', 'Jones', 'strange@gmail.com', '', 65, 'female', 'Pull up to my bumper baby', '$PapasT1O99'),
   ('ahhnuld', 'Conan', 'Barbarian', 'ahhnuld@gmail.com', '', 70, 'male', 'Get to the chopper', '&IllBBackRibs2O20');

-- Seed data for interest table
INSERT INTO interest (interest_name)
VALUES  
    ('Weight Loss'),
    ('Fitness'), 
    ('Learning Languages');

-- Seed data for goals table
INSERT INTO goals (user_profile_id, partner_user_id, goal_name, goal_description, target_date, creater_progress, partner_progress, interest_id)
VALUES
    (1, 2, 'Lose 20 lbs in 90 days', 'I want to lose 20 lbs before the wedding day','2024-05-01', 0, 0, 1),
    (2, 1, 'Workout 4x per week this Summer', 'Finding it difficult to get motivated to go more than twice a week','2024-09-01', 0, 0, 2),
    (3, 2, 'Learn Russian before December', 'Going on a trip to Moscow over Christmas and want to learn to speak a little of the language','2024-12-01', 0, 0, 3);

-- Seed data for interest_connection table
INSERT INTO interest_connection (interest_id, user_profile_id)
VALUES
    (1, 1),
    (2, 1),
    (2, 2);

-- Seed data for connection_request table
INSERT INTO connection_request (sender_id, receiver_id, status, last_login)
VALUES  
    (1, 2, 'Pending', '2024-02-29 10:00:00'),
    (2, 1, 'Accepted', '2024-02-26 14:00:00'),
    (2, 2, 'Rejected', '2024-03-01 16:30:00');