// server.js
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');

const app = express();
app.use(cors());
app.use(express.json());

// Lowdb
const adapter = new JSONFile('./db.json');
const defaultData = { users: [], works: [], chapters: [] };
const db = new Low(adapter, defaultData);

const JWT_SECRET = 'dev_mytale_secret';

async function initDB() {
  await db.read();
  db.data ||= { users: [], works: [], chapters: [] };
  await db.write();
}
initDB();

/* -------------------- SEED DEMO USER -------------------- */
async function ensureDemoUser() {
  await db.read();

  db.data.users    ||= [];
  db.data.works    ||= [];
  db.data.chapters ||= [];

  const demoEmail = "demo@mytale.app";
  let u = db.data.users.find(x => x.email === demoEmail && !x.deleted);

  if (!u) {
    const hash = await bcrypt.hash("123456", 10);
    u = {
      id: "u_demo",
      email: demoEmail,
      passwordHash: hash,
      name: "Mr. A B C",
      language: "vi",
      followings: [],
      deleted: false
    };
    db.data.users.push(u);
  }

  if (!db.data.works.find(w => w.id === "w1")) {
    db.data.works.push({
      id: "w1",
      title: "Truyện A",
      summary: "Giới thiệu A",
      coverPreview: "",
      firstChapter: null,
      updatedAt: "",
      chapCount: 0, likes: 0, reads: 0, comments: 0,
      isCompleted: false,
      authorId: "u_demo", tags: [], genres: [],
      deleted: false
    });
  }
  if (!db.data.works.find(w => w.id === "w2")) {
    db.data.works.push({
      id: "w2",
      title: "Truyện B",
      summary: "Giới thiệu B",
      coverPreview: "",
      firstChapter: null,
      updatedAt: "",
      chapCount: 0, likes: 0, reads: 0, comments: 0,
      isCompleted: false,
      authorId: "u_demo", tags: [], genres: [],
      deleted: false
    });
  }

  if (!u.followings || u.followings.length === 0) {
    u.followings = ["w1", "w2"];
  }

  await db.write();
}
ensureDemoUser();
/* ------------------ END SEED DEMO USER ------------------ */

// ---------- AUTH MIDDLEWARE ----------
function auth(req, res, next) {
  const token = (req.headers.authorization || '').replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token' });
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.userId = payload.userId;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
}

// ============== AUTH ==============
app.post('/api/auth/login', async (req, res) => {
  await db.read();
  const { email, password } = req.body;
  const user = db.data.users.find(u => u.email === email && !u.deleted);
  if (!user) return res.status(400).json({ message: 'Sai email hoặc mật khẩu' });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(400).json({ message: 'Sai email hoặc mật khẩu' });
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token });
});

// ============= ACCOUNT =============
app.get('/api/account/profile', auth, async (req, res) => {
  await db.read();
  const u = db.data.users.find(u => u.id === req.userId);

  // chỉ tính tác phẩm & theo dõi chưa bị xoá
  const worksMine = db.data.works.filter(w => w.authorId === u.id && !w.deleted);
  const followingAlive = db.data.works.filter(
    w => (u.followings || []).includes(w.id) && !w.deleted
  );

  res.json({
    name: u.name,
    email: u.email,
    language: u.language,
    worksCount: worksMine.length,
    followingCount: followingAlive.length
  });
});

app.put('/api/account/profile', auth, async (req, res) => {
  await db.read();
  const u = db.data.users.find(u => u.id === req.userId);
  u.name = req.body.name ?? u.name;
  await db.write();
  res.json({ ok: true });
});

app.get('/api/account/followings', auth, async (req, res) => {
  await db.read();
  const u = db.data.users.find(u => u.id === req.userId);
  const list = db.data.works.filter(w => (u.followings || []).includes(w.id) && !w.deleted);
  res.json(list);
});

app.get('/api/account/settings', auth, async (req, res) => {
  await db.read();
  const u = db.data.users.find(u => u.id === req.userId);
  res.json({ language: u.language, email: u.email });
});

app.put('/api/account/settings/language', auth, async (req, res) => {
  await db.read();
  const u = db.data.users.find(u => u.id === req.userId);
  u.language = req.body.language || 'vi';
  await db.write();
  res.json({ ok: true });
});

app.post('/api/account/security/change-password', auth, async (req, res) => {
  const { newPassword } = req.body;
  if (!newPassword || newPassword.length < 6)
    return res.status(400).json({ message: 'Mật khẩu ≥ 6 ký tự' });
  await db.read();
  const u = db.data.users.find(u => u.id === req.userId);
  u.passwordHash = await bcrypt.hash(newPassword, 10);
  await db.write();
  res.json({ ok: true });
});

app.post('/api/account/security/delete-account', auth, async (req, res) => {
  await db.read();
  const u = db.data.users.find(u => u.id === req.userId);
  u.deleted = true;
  await db.write();
  res.json({ ok: true });
});

// =========== AUTHOR CENTER ===========
app.get('/api/author/works', auth, async (req, res) => {
  await db.read();
  res.json(db.data.works.filter(w => w.authorId === req.userId && !w.deleted));
});

// Lấy 1 tác phẩm (cho màn chỉnh sửa)
app.get('/api/author/works/:id', auth, async (req, res) => {
  await db.read();
  const w = db.data.works.find(x => x.id === req.params.id && x.authorId === req.userId && !x.deleted);
  if (!w) return res.status(404).json({ message: 'Không tìm thấy' });
  res.json(w);
});

// Tạo mới
app.post('/api/author/works', auth, async (req, res) => {
  await db.read();
  const {
    title,
    summary,
    tags = [],
    genres = [],
    coverPreview = '',
    firstChapter = null,
    updatedAt = ''
  } = req.body;

  const id = 'w' + (Math.random() * 1e6 | 0);
  db.data.works.push({
    id, title, summary,
    coverPreview, firstChapter, updatedAt,
    chapCount: firstChapter ? 1 : 0,
    likes: 0, reads: 0, comments: 0,
    isCompleted: false,
    authorId: req.userId, tags, genres,
    deleted: false
  });
  await db.write();
  res.json({ id });
});

// Cập nhật thông tin truyện
app.put('/api/author/works/:id', auth, async (req, res) => {
  await db.read();
  const w = db.data.works.find(x => x.id === req.params.id && x.authorId === req.userId && !x.deleted);
  if (!w) return res.status(404).json({ message: 'Không tìm thấy' });

  ['title','summary','tags','genres','coverPreview','firstChapter','updatedAt','chapCount','isCompleted']
    .forEach(k => { if (req.body[k] !== undefined) w[k] = req.body[k]; });

  await db.write();
  res.json({ ok: true });
});

// Xoá truyện (soft-delete) + xoá chương liên quan + gỡ khỏi followings của mọi user
app.delete('/api/author/works/:id', auth, async (req, res) => {
  await db.read();
  const id = req.params.id;
  const w = db.data.works.find(x => x.id === id && x.authorId === req.userId && !x.deleted);
  if (!w) return res.status(404).json({ message: 'Không tìm thấy' });

  // 1) Đánh dấu xoá
  w.deleted = true;

  // 2) Xoá chương liên quan
  db.data.chapters = (db.data.chapters || []).filter(c => c.workId !== id);

  // 3) Gỡ khỏi followings của tất cả user
  for (const usr of db.data.users) {
    usr.followings = (usr.followings || []).filter(x => x !== id);
  }

  await db.write();
  res.json({ ok: true });
});

// =============== CHAPTERS ===============
app.get('/api/author/works/:id/chapters', auth, async (req, res) => {
  await db.read();
  const wid = req.params.id;
  const w = db.data.works.find(x => x.id === wid && x.authorId === req.userId && !x.deleted);
  if (!w) return res.status(404).json({ message: 'Không tìm thấy tác phẩm' });
  const list = db.data.chapters.filter(c => c.workId === wid);
  res.json(list);
});

app.post('/api/author/works/:id/chapters', auth, async (req, res) => {
  await db.read();
  const wid = req.params.id;
  const w = db.data.works.find(x => x.id === wid && x.authorId === req.userId && !x.deleted);
  if (!w) return res.status(404).json({ message: 'Không tìm thấy tác phẩm' });

  const { title, content } = req.body;
  if (!title || !content) return res.status(400).json({ message: 'Thiếu tiêu đề / nội dung' });

  const cid = 'c' + (Math.random() * 1e6 | 0);
  db.data.chapters.push({ id: cid, workId: wid, title, content, createdAt: Date.now() });

  w.chapCount = (w.chapCount || 0) + 1;

  await db.write();
  res.json({ id: cid });
});

// ---------------------------------------
const PORT = 4000;
app.listen(PORT, () => console.log('Backend running http://localhost:' + PORT));
