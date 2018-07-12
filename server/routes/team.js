const mongoose = require('mongoose');
const { Router } = require('express');
const router = Router();
const { sortPlayers } = require('../utils/helpers')

// Import models
const TeamSchema = require('../models/team');
const Team = mongoose.model('team', TeamSchema);

// get all teams
const getTeams = (req, res) => {
  Team.getAllTeams()
    .then( teams => res.status(200).json(sortPlayers(teams)) )
    .catch( err => res.status(400).json(err.message));
}

// get team by ID in route
const getTeam = (req, res) => {
  Team.findById(req.params.id)
    .then( team => {
      console.log('team', team)
      res.status(200).json(team);
    })
    .catch( err => res.status(400).json(err.message));
}

// add new team
const addTeam = async (req, res) => {
  const newTeam = new Team(req.body);
  await newTeam.save()
    .catch( err => res.status(400).json(err.message));
  await Team.getAllTeams()
    .then( teams => { res.status(200).json(teams) })
    .catch( err => res.status(400).json(err.message));
}

// get all teams
const updateTeam = async (req, res) => {
  await Team.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
    .catch( err => res.status(400).json(err.message));
  await Team.getAllTeams()
    .then( teams => { res.status(200).json(teams) })
    .catch( err => res.status(400).json(err.message));
}

// delete a team
const deleteTeam = async (req, res) => {
  await Team.findByIdAndRemove(req.params.id)
    .catch( err => res.status(400).json(err.message));
  await Team.getAllTeams()
    .then( teams => { res.status(200).json(teams) })
    .catch( err => res.status(400).json(err.message));
}

// Routes: root === /team
router.get('/', getTeams);
router.get('/:id', getTeam);
router.post('/', addTeam); // could also be a patch
router.put('/:id', updateTeam);
router.delete('/:id', deleteTeam);

// export routes
module.exports = router;