require('dotenv').config(); // Load environment variables
const connectDB = require('./config/db'); // Import DB connection

(async () => {
    try {
        await connectDB(); // Attempt DB connection
        console.log('Database connection successful!');
        process.exit(0);
    } catch (error) {
        console.error('Database connection failed:', error.message); // Print error message
        process.exit(1);
    }
})();
