const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const authRoutes = require('./routes/auth.routes');
const foodPartnerRoutes = require('./routes/food-partner.routes');
const foodRoutes = require('./routes/food.routes');

app.use(express.json());
app.use(cookieParser());
app.use(cors(
    {
        origin: ['http://localhost:3000','http://localhost:3001','http://localhost:5173','http://localhost:5174'],
        credentials: true,
    }
));

app.use('/api/auth', authRoutes);
app.use('/api/auth', foodPartnerRoutes);
app.use('/api/food', foodRoutes);

module.exports = app;