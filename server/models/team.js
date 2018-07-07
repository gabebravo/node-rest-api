const mongoose = require('mongoose');
const PlayerSchema = require('./player');

const TeamSchema = new mongoose.Schema({
  name: String,
  players: { type: [PlayerSchema] },
});

TeamSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) { delete ret._id }
});

module.exports = TeamSchema;