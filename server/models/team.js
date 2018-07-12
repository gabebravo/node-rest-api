const mongoose = require('mongoose');
const PlayerSchema = require('./player');
// const _ = require('lodash')

const TeamSchema = new mongoose.Schema({
  name: String,
  players: { type: [PlayerSchema] },
});

TeamSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) { delete ret._id }
});

TeamSchema.statics.getAllTeams = function (cb) {
  return this.find({}).lean().exec(cb);
}

// TeamSchema.methods.sortPlayers = teams => {
//   console.log('teams', teams)
//   const result = _.map(teams, team => _.sortBy(team.players, ['name']));
//   console.log('result', result)
// }

module.exports = TeamSchema;