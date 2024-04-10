\c goalhive_app

-- Seed data for the user_profiles table
INSERT INTO user_profiles
    (username, email, password_hash, firstname, lastname, profile_img, age, gender, bio)
VALUES
    ('John54', 'john54@example.com', 'hashed_password1', 'John', 'Doe', 'profile1.png', 25, 'Male', 'Bio for John54'),
    ('Jane', 'Jane@example.com', 'hashed_password2', 'Jane', 'Smith', 'profile2.png', 30, 'Female', 'Bio for Jane'),
    ('Samantha95', 'Samantha95@example.com', 'hashed_password3', 'Samantha', 'Johnson', 'profile3.png', 28, 'Female', NULL),
    ('TyShawn9', 'TyShawn9@example.com', 'password4444', 'TyShawn', 'Wright', 'profile4.png', 28, 'Male', 'This is the bio for Tyshawn'),
    ('DenistheMenance', 'dmenace@aol.com', 'hashed_password05', 'Denis', 'Menais', 'profile005.png', 41, '', 'Bio info for Denis'),
    ('Tamara357', 'tamara@oaktown357.com', 'hashed_password06', 'Tamara', 'Jackson', 'profile006.png', 37, 'female', 'Bio info for Tamara'),
    ('mbrown', 'michaelbrown@pursuit.org', 'hashed_password07', 'Michael', 'Brown', 'profile007.png', 29, 'male', 'Bio info for Michael'),
    ('llettings', 'lisalettings@aol.com', 'hashed_password08', 'Lisa', 'Lettings', 'profile008.png', 23, 'female', 'Bio info for Lisa'),
    ('patTcake', 'pmoncake@email.com', 'hashed_password09', 'Pat', 'Moncake', 'profile009.png', 33, '', 'Bio info for Pat'),
    ('topofdarock', 'rockybordino@gmail.com', 'hashed_password10', 'Rocky', 'Bordino', 'profile010.png', 45, 'male', 'Bio info for Rocky');
-- Seed data for the interests table
INSERT INTO interests
    (name)
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
INSERT INTO goals
    (name, description, completed, target_date, created_at, userprofile_id, interest_id )
VALUES
    ('Learn Web Development', 'Complete a web development course', false, '2024-12-31', CURRENT_TIMESTAMP, 1, 1),
    ('Hike a Mountain', 'Reach the summit of a challenging mountain', true, '2024-08-15', CURRENT_TIMESTAMP, 2, 2),
    ('Start a Photography Blog', 'Share photography experiences and tips', true, '2024-10-01', CURRENT_TIMESTAMP, 1, 3),
    ('Indoor Food Gardening', 'Grow vegetables and herbs in my apartment', false, '2024-9-01', CURRENT_TIMESTAMP, 4, 4),
    ('Lose Excess Skin', 'Tighten up the extra skin around my arms and legs', true, '2024-8-21', CURRENT_TIMESTAMP, 3, 6),
    ('Learn Blockchain', 'Learn the fundamental basics of bitcoin and blockchain technology', false, '2024-7-5', CURRENT_TIMESTAMP, 3, 9),
    ('Gardening for dummies course', 'They offer a class at the local lgbt center', false,  '2024-8-24', CURRENT_TIMESTAMP, 1, 4),
    ('Weed our community garden', 'I need to try to weed our garden at least once a week this Spring', true, '2024-9-19', CURRENT_TIMESTAMP, 2, 4),
    ('Learn Python', 'I''m trying to learn Python for an upcoming project at work', true, '2024-6-5', CURRENT_TIMESTAMP, 4, 1),
    ('SQL Course', 'Need to freshen up my sql skills for a job interview', false, '2024-5-28', CURRENT_TIMESTAMP, 2, 1);

INSERT INTO interest_connections
    (userprofile_id, interest_id)
VALUES
    (1, 1),
    (1, 3),
    (1, 4),
    (2, 5),
    (3, 3),
    (3, 6),
    (4, 1),
    (4, 4),
    (4, 1);

INSERT INTO connection_requests
    (sender_user_profile_id, receiver_user_profile_id, status, timestamp)
VALUES
    (1, 2, 'accepted', CURRENT_TIMESTAMP),
    (3, 1, 'pending', CURRENT_TIMESTAMP),
    (3, 4, 'accepted', CURRENT_TIMESTAMP),
    (4, 1, 'pending', CURRENT_TIMESTAMP),
    (4, 2, 'accepted', CURRENT_TIMESTAMP),
    (2, 3, 'accepted', CURRENT_TIMESTAMP),
    (6, 8, 'pending', CURRENT_TIMESTAMP),
    (7, 4, 'accepted', CURRENT_TIMESTAMP),
    (8, 10, 'pending', CURRENT_TIMESTAMP);
    
INSERT INTO posts (userprofile_id, post_description)
VALUES
  (1, 'The golden sun slowly descended below the horizon, casting a warm glow across the tranquil beach. The gentle waves lapped against the shore, creating a soothing melody. As the sky transformed into a kaleidoscope of vibrant colors, I couldnt help but marvel at the breathtaking beauty of nature.'),
  (2, 'Indulge in the ultimate chocolate lovers dream with this delectable recipe for a moist and rich chocolate cake. The velvety smooth texture melts in your mouth, while the intense cocoa flavor tantalizes your taste buds. With each bite, youll savor the heavenly combination of decadent chocolate and a hint of vanilla. Whether its a special occasion or just a craving, this cake is sure to satisfy your sweet tooth.'),
  (3, 'Embarking on a thrilling hiking adventure in the majestic mountains was an experience like no other. The crisp mountain air invigorated my senses as I navigated through rugged trails and lush forests. With every step, the breathtaking panoramic views unfolded before me, revealing natures awe-inspiring beauty. As I reached the summit, a sense of accomplishment washed over me, knowing that I had conquered the challenges and witnessed natures raw grandeur.'),
  (4, 'Immersing myself in the captivating world of literature, I recently delved into a thought-provoking book that left an indelible impact on my mind. The eloquent prose and intricate storytelling transported me to a different time and place. The complex characters and their emotions resonated with me, evoking a myriad of feelings. This literary masterpiece challenged my perspectives and ignited a passion for exploration and self-reflection.'),
  (5, 'Mastering the art of effective time management is essential in todays fast-paced world. With a few simple strategies, you can maximize productivity and achieve a healthy work-life balance. Prioritizing tasks, setting realistic goals, and utilizing productivity tools can help you stay focused and organized. Remember to allocate time for self-care and relaxation, as rejuvenation is equally important for maintaining long-term productivity. With proper time management, you can unlock your full potential and accomplish more in all areas of life.'),
  (1, '(2)The golden sun slowly descended below the horizon, casting a warm glow across the tranquil beach. The gentle waves lapped against the shore, creating a soothing melody. As the sky transformed into a kaleidoscope of vibrant colors, I couldnt help but marvel at the breathtaking beauty of nature.');

INSERT INTO comments (description, userprofile_id, post_id )
VALUES 
('This is awesome', 1, 1),
('This is so cool', 2, 1),
('This is awesome', 3, 3),
('This is awesome', 4, 4),
('This is awesome', 5, 5);

INSERT INTO likes (userprofile_id, post_id )
VALUES 
(1,1),
(2,1),
(3,1),
(1,5),
(2,5),
(2,4),
(3,4),
(3,3),
(4,4),
(5,4),
(5,5);