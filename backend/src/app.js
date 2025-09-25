require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { sequelize } = require('./models');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/stories', require('./routes/stories'));
// nested: chapters and comments under stories
app.use('/api/stories/:storyId/chapters', require('./routes/chapters'));
app.use('/api/stories/:storyId/comments', require('./routes/comments'));

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '..', '..', 'public', 'index.html')));

const PORT = process.env.PORT || 4000;

async function start() {
	try {
		await sequelize.authenticate();
		console.log('DB connected');
		if (process.env.SYNC_DB === 'true') {
			await sequelize.sync({ alter: true });
			console.log('DB synced');
		}
		app.listen(PORT, () => console.log(`MyTale backend listening on ${PORT}`));
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
}

start();

