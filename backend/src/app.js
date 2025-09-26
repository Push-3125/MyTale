const express = require("express");
const mysql = require("mysql2/promise");

const app = express();
const PORT = 3000;

// Hàm tạo kết nối DB
async function createConnection() {
    return mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mytale"
    });
}

// Route test để check server
app.get("/", (req, res) => {
    res.send("OK!");
});

// Route search
app.get("/search", async (req, res) => {
    const keyword = req.query.keyword || "";
    try {
    const conn = await createConnection();
    const sql = `
        SELECT s.id, s.title, u.username AS author, s.summary, s.status
        FROM stories s
        JOIN users u ON s.author_id = u.id
        WHERE s.title LIKE ? OR u.username LIKE ?
    `;
    const [rows] = await conn.execute(sql, [`%${keyword}%`, `%${keyword}%`]);
    await conn.end();
    res.json(rows);
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
});

// Mở cổng server
app.listen(PORT, () => {
    console.log(`✅ Server chạy tại http://localhost:${PORT}`);
});
