const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(async () => {
        console.log('MongoDB connected');

        // Create a new user
        const newUser = new User({
            name: 'Admin Test',
            email: 'newtest@example.com',  // Change this to a unique email
            password: 'password123',
            role: 'user'
        });
        

        // Save the user
        await newUser.save();
        console.log('New user created:', newUser);

        // Check if the password matches
        const isPasswordMatch = await newUser.matchPassword('password123');
        console.log('Password match:', isPasswordMatch);

        // Generate a JWT token for the user
        const token = newUser.generateToken();
        console.log('JWT Token:', token);

        mongoose.connection.close();
    })
    .catch(err => console.error('Error:', err));
