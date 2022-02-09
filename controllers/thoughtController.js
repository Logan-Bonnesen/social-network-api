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

    // get single thought ?? line 21
    getThoughtById(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .select('__v')
        .then((thought) => 
        !thought
        ? res.status(404).json({ message: 'There is no thought with that ID'})
        : res.json(thought))
        .catch((err) => res.status(500).json(err))
    },
    // update thought ================== updateOne or findOneAndUpdate????????
    updateThought(req, res) {
        Thought.updateOne
    },

    // delete thought ??? line 
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughId })
        .then((thought) => 
        !thought
        ?res.status(404).json({ message: 'There is no thought with that ID'})
        : Thought.deleteOne({ _id: { $in: user.thoughts} })
        )
        .then(() => res.json({ message: 'This thought has been deleted'}))
        .catch((err) => res.status(500).json(err))
    }

}