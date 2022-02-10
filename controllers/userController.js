const { User } = require("../models");

const userController = {
// creates new user
    addUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err))
    },
// get all users
    getAllUsers(req, res) {
        User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err))
    },

    // get single user
    getUserById(req, res) {
        User.findOne({_id: req.params.userId })
        .select('-__v')
        .populate('thoughts')
        .populate('friends')
        .then((user) => 
        {!user
        ? res.status(404).json({ message: 'There is no user with that ID'})
        : res.json(user)})
        .catch((err) => res.status(500).json(err))
    },
    // update user
    updateUser(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$set: req.body},
            {new: true} 
            ).then((response) => {
                res.json(response)
            }).catch((err) => res.json(err))
    },
    // delete user
    deleteUser(req, res) { 
        User.findOneAndDelete({ _id: req.params.userId })
        .then((user) => 
        !user
        ? res.status(404).json({ message: 'There is no user with that ID'})
        : Thought.deleteMany({ _id: { $in: user.thoughts} })
        )
        .then(() => res.json({ message: 'This user and associated thoughts have been deleted.'}))
        .catch((err) => res.status(500).json(err))
    },
    // adding friend
    addFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$addToSet: {friends: req.params.friendId}},
            {new: true}
        ).then((response) => {
            res.json(response)
        }).catch(err => res.json(err));
    },
    // deleting friend
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$pull: {friends: req.params.friendId}},
            {new: true}
        ).then((response) => {
            res.json(response)
        }).catch(err => res.json(err));
    }
     

}

module.exports = userController;

