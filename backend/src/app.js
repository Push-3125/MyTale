const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const ratingRoutes = require('./routes/rating.route');
const commentRoutes = require('./routes/comment.route');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log(' Đã kết nối MongoDB'))
  .catch(err => console.error(' Lỗi kết nối MongoDB:', err));

// Định tuyến API
app.use('/api/rating', ratingRoutes);
app.use('/api/comment', commentRoutes);

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Backend đang chạy tại http://localhost:${PORT}`);
});
