const passport = require('passport');
const { ExtractJwt, Strategy: JwtStrategy } = require('passport-jwt');
const User = require('../models/User'); // Import the User model
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// JWT Strategy options
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

// JWT Strategy to verify the token and get the user
passport.use(
    new JwtStrategy(options, async (payload, done) => {
        try {
            const user = await User.findById(payload.id);
            if (!user) {
                return done(null, false, { message: 'User not found' });
            }
            return done(null, user);
        } catch (error) {
            return done(error, false);
        }
    })
);

// Exporting passport to be used in other parts of the application
module.exports = passport;
