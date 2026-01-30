const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const User = require('../models/User');
const auth = require('../middleware/authMiddleware');

// GET reviews for a specific art
router.get('/:artId', async (req, res) => {
    try {
        const reviews = await Review.findAll({
            where: { artId: req.params.artId },
            order: [['createdAt', 'DESC']]
        });
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST new art-specific review (Protected)
router.post('/:artId', auth, async (req, res) => {
    try {
        const { content, rating } = req.body;

        // Fetch user to get correct username and serial (token might be light)
        const user = await User.findByPk(req.user.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });

        // Check ban status
        if (user.bannedState && (!user.banUntil || new Date(user.banUntil) > new Date())) {
            return res.status(403).json({
                msg: `Access Denied: You are in timeout until ${user.banUntil ? user.banUntil.toLocaleString() : 'indefinite'}. Reason: ${user.bannedReason || 'None'}`
            });
        }

        const newReview = await Review.create({
            author: user.username,
            authorSerial: user.serialNumber,
            userId: user.id,
            content,
            rating,
            artId: req.params.artId
        });
        res.status(201).json(newReview);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
