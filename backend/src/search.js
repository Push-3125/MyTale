const mysql = require("mysql2/promise");

async function createConnection() {
    return mysql.createConnection({
    host: "localhost",
    user: "root",     // thay bằng user MySQL của bạn
    password: "",     // thay bằng mật khẩu
    database: "mytale" // tên database sau khi import schema.sql + seed.sql
    });
}

async function searchStories(keyword) {
    const conn = await createConnection();

    const sql = `
    SELECT s.id, s.title, u.username AS author, s.summary, s.status
    FROM stories s
    JOIN users u ON s.author_id = u.id
    WHERE s.title LIKE ? OR u.username LIKE ?
    `;

    const [rows] = await conn.execute(sql, [`%${keyword}%`, `%${keyword}%`]);
    await conn.end();
    return rows;
}

// chạy: node search.js "keyword"
(async () => {
    const keyword = process.argv[2] || "Hành";
    const results = await searchStories(keyword);
    console .log("Kết quả tìm kiếm:", results);
})();