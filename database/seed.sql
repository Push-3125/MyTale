USE mytale;

-- Clear existing data (safe for local dev)
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE story_tags;
TRUNCATE TABLE tags;
TRUNCATE TABLE ratings;
TRUNCATE TABLE comments;
TRUNCATE TABLE chapters;
TRUNCATE TABLE stories;
TRUNCATE TABLE users;
SET FOREIGN_KEY_CHECKS = 1;

-- Users (passwords are plain here for seed; in real app store hashed passwords)
INSERT INTO users (username, email, password, display_name, role) VALUES
('alice','alice@example.com','password123','Alice','user'),
('bob','bob@example.com','password123','Bob','user'),
('carol','carol@example.com','password123','Carol','user'),
('admin','admin@example.com','adminpass','Administrator','admin');

-- Stories (5 stories, each 2-3 chapters)
INSERT INTO stories (title, description, genre, tags, author_id, status) VALUES
('Hành Trình Của Nam','Câu chuyện phiêu lưu của Nam','Phiêu lưu','adventure,young',1,'published'),
('Bí Ẩn Trong Rừng','Một bí ẩn trong khu rừng cổ','Huyền bí','mystery,forest',2,'published'),
('Tình Yêu Và Số Phận','Tiểu thuyết lãng mạn','Lãng mạn','romance,drama',3,'published'),
('Cỗ Máy Thời Gian','Khoa học viễn tưởng về thời gian','Sci-Fi','sci-fi,time',1,'published'),
('Nhật Ký CủA Một Học Sinh','Những ngày đi học','Cuộc sống','slice-of-life,school',2,'published');

-- Chapters for each story
INSERT INTO chapters (story_id, title, content, chapter_index) VALUES
-- Story 1
(1,'Chương 1: Khởi đầu','Nam bắt đầu hành trình...',1),
(1,'Chương 2: Lộ trình','Nam băng qua rừng...',2),
(1,'Chương 3: Kho báu','Nam tìm thấy kho báu...',3),
-- Story 2
(2,'Chương 1: Lời thì thầm','Tiếng thì thầm trong rừng...',1),
(2,'Chương 2: Đêm mưa','Một đêm mưa rít...',2),
-- Story 3
(3,'Chương 1: Gặp gỡ','Họ gặp nhau ở quán cà phê...',1),
(3,'Chương 2: Hiểu lầm','Một hiểu lầm xảy ra...',2),
-- Story 4
(4,'Chương 1: Cỗ máy','Phát hiện cỗ máy thời gian...',1),
(4,'Chương 2: Du hành','Một chuyến du hành ngắn...',2),
-- Story 5
(5,'Chương 1: Ngày đầu','Ngày đầu tiên ở trường...',1),
(5,'Chương 2: Kỉ niệm','Những kỉ niệm đẹp...',2);

-- Comments (10 comments)
INSERT INTO comments (user_id, story_id, chapter_id, content) VALUES
(2,1,1,'Bắt đầu hay quá!'),
(3,1,2,'Mình muốn đọc tiếp.'),
(1,2,1,'Cảm giác rùng rợn lắm.'),
(4,3,NULL,'Tuyệt vời, cảm ơn tác giả.'),
(2,3,2,'Câu chuyện rất cảm động.'),
(3,4,1,'Ý tưởng rất sáng tạo.'),
(1,4,2,'Phần du hành thật thú vị.'),
(2,5,1,'Gợi nhớ tuổi học trò.'),
(3,5,2,'Những chi tiết rất chân thực.'),
(1,1,3,'Kết thúc hợp lý.');

-- Ratings (sample)
INSERT INTO ratings (user_id, story_id, rating) VALUES
(1,1,5),(2,1,4),(3,1,5),(2,2,4),(3,2,3),(1,3,4);

-- Sample tags
INSERT INTO tags (name) VALUES ('adventure'),('mystery'),('romance'),('sci-fi'),('school');
INSERT INTO story_tags (story_id, tag_id) VALUES (1,1),(2,2),(3,3),(4,4),(5,5);


