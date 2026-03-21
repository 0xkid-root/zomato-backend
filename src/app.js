const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth.routes');

app.use(express.json());
app.use(cors());

app.use('/api/v1', authRoutes);

module.exports = app;