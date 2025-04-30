const mongoose = require('mongoose');

const PizzaSchema = new mongoose.Schema({
  userName: {type: String},
  result: { type: String },
  traits: { type: Array },
  description: { type: String }
});

const PizzaModel = mongoose.model('Pizza', PizzaSchema);
module.exports = PizzaModel;
