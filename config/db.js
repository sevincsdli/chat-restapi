const mongoose=require('mongoose')
require('dotenv').config()
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('connected', () => {
  console.log('Connected to database');
});

db.on('error', (err) => {
  console.log('MongoDB connection error:', err);
});

module.exports = db;
