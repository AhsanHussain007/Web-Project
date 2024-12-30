const User = require('../models/userSchema.js');
const asynchandler = require("express-async-handler");
const bcrypt = require('bcrypt');

exports.create_user = asynchandler(async (req, res) => {
    try {
        const { email, password, userName } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            userName,
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({
            message: 'User created successfully',
            user,
        });

    } catch (error) {
        res.status(400).json({
            error: 'Signup failed',
            details: error.message
        });
    }
});


exports.login_user = asynchandler(async(req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid login credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid login credentials' });
        }

        res.status(200).json({
            message: 'Login successful',
            user,
        });

    } catch (error) {
        res.status(400).json({
            error: 'Login failed',
            details: error.message
        });
    }
});