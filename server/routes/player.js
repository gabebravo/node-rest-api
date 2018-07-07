const mongoose = require('mongoose');
const { Router } = require('express');
const router = Router();

// Import models
const TeamSchema = require('../models/team');
const Team = mongoose.model('team', TeamSchema);

const PlayerSchema = require('../models/player');
const Player = mongoose.model('player', PlayerSchema);

// get all players
const getPlayers = (req, res) => {
  Team.findById(req.params.teamId)
    .then( team => {
      console.log('players', team.players)
      res.status(200).json({ players: team.players });
    })
    .catch( err => res.status(400).json(err.message));
}

// get player by ID in route
const getPlayer = (req, res) => {
  let foundPlayer = {};
  Team.findById(req.params.teamId)
    .then( team => {
      const thisPlayer = team.players.id(req.params.playerId);
      res.status(200).json({ player: thisPlayer });
    })
    .catch( err => res.status(400).json(err.message));
}

// Routes: root === /teams
router.get('/:teamId', getPlayers);
router.get('/:teamId/:playerId', getPlayer);

// export routes
module.exports = router;