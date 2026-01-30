const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database Connection (MySQL / Sequelize)
const sequelize = require('./config/database');

// Routes
const artRoutes = require('./routes/artRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

app.use('/api/v1/art', artRoutes);
app.use('/api/v1/reviews', reviewRoutes);
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/admin', require('./routes/adminRoutes'));

app.get('/api/v1/health', (req, res) => res.json({ status: 'active', version: 'paginated-masonry-v1' }));

// Sync Database & Start Server
sequelize.sync()
    .then(() => {
        console.log('MySQL Database Connected & Synced');
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch(err => console.log('Error connecting to MySQL:', err));
