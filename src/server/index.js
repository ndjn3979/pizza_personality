const express = require('express');
const { stringify } = require('mocha/lib/utils');
const mongoose = require('mongoose');
const PizzaModel = require('./model/PizzaModel');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(
  'mongodb+srv://marrowmichal:Pizza@scratchproject.c9movya.mongodb.net/'
);

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.once('open', () => {
  console.log('Successfully connected to MongoDB!');
});

db.on('disconnected', () => {
  console.log('MongoDB disconnected!');
});

db.on('reconnected', () => {
  console.log('MongoDB reconnected!');
});
db.on('connecting', () => {
  console.log('Connecting to MongoDB...');
});
app.post('/PostPizza', async (req, res) => {
  //1.grab from the req.body the data
  const { name, traits, description } = req.body;
  console.log('hitting this line');
  try {
    //create the new model with the data using the already set up schema
    const newPizza = new PizzaModel({
      name,
      traits,
      description,
    });
    const savedPizza = await newPizza.save();
    res.json(savedPizza);
  } catch (err) {
    console.err('Error posting pizza to database:', err);
    res.status(500).json({ message: 'Failed to post pizza' });
  }
});
//make completion of post request
//
app.listen(3001, () => {
  console.log('Server is Running');
});
