const { Thought, User } = require('../models');
const userController = require('./userController');

const thoughtController = {
    // creates new thought
    addThought(req, res) {
        Thought.create(req.body)
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err))
    },

    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err))
    },

    // get single thought 
    getThoughtById(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        .populate('reactions')
        .then((thought) => 
        !thought
        ? res.status(404).json({ message: 'There is no thought with that ID'})
        : res.json(thought))
        .catch((err) => res.status(500).json(err))
    },
    // update thought 
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$set: req.body},
            {new: true}
        ).then((response) => {
            res.json(response)
        }).catch((err) => res.json(err))
    },

    // delete thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then((thought) => 
        !thought
        ?res.status(404).json({ message: 'There is no thought with that ID'})
        : Thought.deleteOne({ _id: { $in: user.thoughts} })
        )
        .then(() => res.json({ message: 'This thought has been deleted'}))
        .catch((err) => res.status(500).json(err))
    },
    // adding reactions
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$addToSet: {reactions: req.body}},
            {new: true}
        ).then((response) => {
            res.json(response)
        }).catch(err => res.json(err));
        
    },

    // deleting reactions
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$pull: {reactions: {reactionId: req.params.reactionId}}},
            {new: true}
        ).then((response) => {
            res.json(response)
        }).catch(err => res.json(err));
    }

}

module.exports = thoughtController;