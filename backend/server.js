const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// // Serve static files from the React app build directory
// app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/gearlink', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.log('Atlas connection failed, trying local MongoDB fallback...');
    console.log(err.message);
    require('fs').appendFileSync('db_error.log', new Date().toISOString() + ': Atlas error: ' + err.message + '\n');

    // Fallback to local MongoDB
    mongoose.connect('mongodb://localhost:27017/gearlink', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
      .then(() => console.log('Connected to local MongoDB'))
      .catch(localErr => {
        console.log('Local MongoDB connection also failed');
        require('fs').appendFileSync('db_error.log', new Date().toISOString() + ': Local error: ' + localErr.message + '\n');
      });
  });

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/contact', require('./routes/contact'));

// Catch all handler: send back React's index.html file for client-side routing
// Test route
app.get('/', (req, res) => {
  res.send('GearLink API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});