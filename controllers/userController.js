const { User } = require("../models");

const userController = {
// creates new user
    addUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err))
    },
// get all users}
    getAllUsers(req, res) {
        User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err))
    },

    // get single user ???? line 20
    getUserById(req, res) {
        User.findOne({_id: req.params.userId })
        .select('__v')
        .then((user) => 
        !user
        ? res.status(404).json({ message: 'There is no user with that ID'})
        : res.json(user))
        .catch((err) => res.status(500).json(err))
    },
    // update user ======================= updateOne or findOneAndUpdate?????
    updateUser(req, res) {
        User.updateOne

    },
    // delete user ?? line 40
    deleteUser(req, res) { 
        User.findOneAndDelete({ _id: req.params.userId })
        .then((user) => 
        !user
        ? res.status(404).json({ message: 'There is no user with that ID'})
        : Thought.deleteMany({ _id: { $in: user.thoughts} })
        )
        .then(() => res.json({ message: 'This user and associated thoughts have been deleted.'}))
        .catch((err) => res.status(500).json(err))
    }
     

}

module.exports = userController;

