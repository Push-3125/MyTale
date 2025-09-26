const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

// MongoDB cho Comment + Rating
const mongoose = require("mongoose");
const ratingRoutes = require("./routes/rating.route");
const commentRoutes = require("./routes/comment.route");

// MySQL cho Stories + Users
const mysql = require("mysql2/promise");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

/* ----------------- MongoDB ----------------- */
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Đã kết nối MongoDB"))
  .catch((err) => console.error("❌ Lỗi kết nối MongoDB:", err));

app.use("/api/rating", ratingRoutes);
app.use("/api/comment", commentRoutes);

/* ----------------- MySQL ----------------- */
async function createConnection() {
  return mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mytale",
  });
}

// Route test
app.get("/", (req, res) => {
  res.send("🚀 Server đang chạy ngon lành!");
});

// Route search story
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

/* ----------------- Start server ----------------- */
app.listen(PORT, () => {
  console.log(`🚀 Backend chạy tại http://localhost:${PORT}`);
});
