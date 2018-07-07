const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
  name: String
});

PlayerSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) { delete ret._id }
});

module.exports = PlayerSchema;