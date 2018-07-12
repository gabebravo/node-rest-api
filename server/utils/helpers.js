const _ = require('lodash')

const sortPlayers = teams => 
  _.map(teams, team => _.sortBy(team.players, ['name']));

  // export routes
module.exports = {
  sortPlayers
};