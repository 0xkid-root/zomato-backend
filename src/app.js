const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const authRoutes = require('./routes/auth.routes');
const foodPartnerRoutes = require('./routes/food-partner.routes');
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/api/v1', authRoutes);
app.use('/api/v1', foodPartnerRoutes);

module.exports = app;