-- Thêm tài khoản người dùng
INSERT INTO users (id, username, email, password, role, created_at) VALUES
(1, 'admin',   'admin@mytale.vn',  'matkhau1', 'admin',  '2025-01-01 10:00:00'),
(2, 'author1', 'author1@mytale.vn','matkhau2', 'author', '2025-01-02 11:00:00'),
(3, 'reader1', 'reader1@mytale.vn','matkhau3', 'reader', '2025-01-03 12:00:00');

-- Thêm truyện (do author1 viết)
INSERT INTO stories (id, author_id, title, summary, status, created_at) VALUES
(1, 2, 'Hành Trình Truyền Thuyết', 'Một chuyến phiêu lưu kỳ bí...', 'published', '2025-02-01 09:00:00'),
(2, 2, 'Tình Yêu Vĩ Đại',     'Câu chuyện tình cảm bi tráng', 'draft',     '2025-02-02 10:00:00');

-- Thêm chương cho truyện 1
INSERT INTO chapters (id, story_id, chapter_no, title, content, created_at) VALUES
(1, 1, 1, 'Khởi Đầu', 'Nội dung chương 1...', '2025-02-01 09:30:00'),
(2, 1, 2, 'Khó Khăn Đầu Tiên', 'Nội dung chương 2...', '2025-02-02 09:45:00');

-- Thêm bình luận trên chương
INSERT INTO comments (id, user_id, story_id, chapter_id, content, created_at) VALUES
(1, 3, 1, 1, 'Chương đầu hấp dẫn quá!', '2025-02-01 10:00:00'),
(2, 1, 1, 2, 'Admin đánh giá nội dung tốt.', '2025-02-02 10:30:00');

-- Thêm đánh giá sao cho truyện 1
INSERT INTO ratings (id, user_id, story_id, rating, created_at) VALUES
(1, 3, 1, 5, '2025-02-01 11:00:00'),
(2, 1, 1, 4, '2025-02-01 12:00:00');

-- Thêm yêu thích (reader1 thích truyện 1)
INSERT INTO favorites (id, user_id, story_id, created_at) VALUES
(1, 3, 1, '2025-02-01 11:30:00');

-- Thêm tags và phân loại truyện
INSERT INTO tags (id, name) VALUES
(1, 'Kỳ ảo'), (2, 'Phiêu lưu'), (3, 'Tình cảm');
INSERT INTO story_tags (story_id, tag_id) VALUES
(1, 1), (1, 2), (2, 3);

-- Thêm báo cáo (reader1 báo cáo truyện 2)
INSERT INTO reports (id, user_id, story_id, comment_id, reason, created_at) VALUES
(1, 3, 2, NULL, 'Nội dung có dấu hiệu vi phạm', '2025-02-05 15:00:00');

-- Thêm log ví dụ (author1 đăng nhập)
INSERT INTO logs (id, user_id, action, created_at) VALUES
(1, 2, 'login', '2025-02-01 08:00:00');

