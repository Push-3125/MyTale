require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Minimal example: health check
app.get('/api/health', (req, res) => res.json({ ok: true }));

// Static placeholder for frontend
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '..', '..', 'public', 'index.html')));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
	console.log(`MyTale backend listening on ${PORT}`);
});

