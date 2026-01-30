const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Art = require('../models/Art');
const Review = require('../models/Review');
const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');

// @route   GET api/v1/admin/stats
// @desc    Get system stats
// @access  Admin
router.get('/stats', auth, admin, async (req, res) => {
    try {
        const userCount = await User.count();
        const artCount = await Art.count();
        const reviewCount = await Review.count();
        res.json({ userCount, artCount, reviewCount });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/v1/admin/users
// @desc    Get all users
// @access  Admin
router.get('/users', auth, admin, async (req, res) => {
    try {
        const users = await User.findAll({ attributes: { exclude: ['password'] } });
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/v1/admin/users/:id
// @desc    Delete a user (Permanent)
// @access  Admin
router.delete('/users/:id', auth, admin, async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });
        await user.destroy();
        res.json({ msg: 'User removed permanently' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/v1/admin/users/ban/:id
// @desc    Ban/Timeout a user
// @access  Admin
router.post('/users/ban/:id', auth, admin, async (req, res) => {
    const { reason, until } = req.body;
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });

        user.bannedState = true;
        user.bannedReason = reason || 'No reason provided';
        user.banUntil = until ? new Date(until) : null;

        await user.save();
        res.json({ msg: 'User placed in timeout', user });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/v1/admin/users/unban/:id
// @desc    Unban a user
// @access  Admin
router.post('/users/unban/:id', auth, admin, async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });

        user.bannedState = false;
        user.bannedReason = null;
        user.banUntil = null;

        await user.save();
        res.json({ msg: 'User released from timeout', user });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/v1/admin/art
// @desc    Get all art
// @access  Admin
router.get('/art', auth, admin, async (req, res) => {
    try {
        const arts = await Art.findAll();
        res.json(arts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/v1/admin/art/:id
// @desc    Delete art
// @access  Admin
router.delete('/art/:id', auth, admin, async (req, res) => {
    try {
        const art = await Art.findByPk(req.params.id);
        if (!art) return res.status(404).json({ msg: 'Art not found' });
        await art.destroy();
        res.json({ msg: 'Art removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/v1/admin/reviews
// @desc    Get all reviews
// @access  Admin
router.get('/reviews', auth, admin, async (req, res) => {
    try {
        const reviews = await Review.findAll();
        res.json(reviews);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/v1/admin/reviews/:id
// @desc    Delete review
// @access  Admin
router.delete('/reviews/:id', auth, admin, async (req, res) => {
    try {
        const review = await Review.findByPk(req.params.id);
        if (!review) return res.status(404).json({ msg: 'Review not found' });
        await review.destroy();
        res.json({ msg: 'Review removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
