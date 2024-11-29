const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendEmail } = require('../utils/emailService');

// Utility: Generate JWT Token
const generateToken = (payload, expiresIn = '1h') => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

// Utility: Handle Server Errors
const handleServerError = (res, error) => {
    console.error(error);
    res.status(500).json({ message: 'An unexpected error occurred' });
};

// Register User
exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'Email already exists' });

        const hashedPassword = await bcrypt.hash(password, 10); // Secure password hashing
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        const verificationToken = generateToken({ id: newUser._id });
        const verificationUrl = `${process.env.BASE_URL}/auth/verify-email/${verificationToken}`;

        await sendEmail(email, 'Verify your email', `Click here to verify your email: ${verificationUrl}`);

        res.status(201).json({ message: 'Registration successful. Please check your email for verification.' });
    } catch (error) {
        handleServerError(res, error);
    }
};

// Login User
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid email or password' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

        if (!user.isVerified) return res.status(403).json({ message: 'Please verify your email to login' });

        const token = generateToken({ id: user._id, role: user.role });
        res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    } catch (error) {
        handleServerError(res, error);
    }
};

// Password Reset Request
exports.passwordReset = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const resetToken = generateToken({ id: user._id });
        const resetUrl = `${process.env.BASE_URL}/auth/password-update/${resetToken}`;

        await sendEmail(email, 'Password Reset Request', `Click here to reset your password: ${resetUrl}`);

        res.status(200).json({ message: 'Password reset link sent to your email.' });
    } catch (error) {
        handleServerError(res, error);
    }
};

// Password Update
exports.passwordUpdate = async (req, res) => {
    const { token, password } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        handleServerError(res, error);
    }
};

// Email Verification
exports.verifyEmail = async (req, res) => {
    const { token } = req.params;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (user.isVerified) return res.status(400).json({ message: 'Email is already verified' });

        user.isVerified = true;
        await user.save();

        res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
        handleServerError(res, error);
    }
};
