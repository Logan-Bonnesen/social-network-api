const { User, Thought } = require("../models");

const friendCount = async () =>
  User.aggregate()
    .count("friendCount")
    .then((numberOfFriends) => numberOfFriends);

module.exports = {
    // get all users
  getAllUsers(res, req) {
    User.find().then(async (user) => {
      const userObj = {
        users,
        friendCount: await friendCount(),
      };
      return res.json(userObj);
    })
    .catch((err) => {
        console.log(err);
        return res.status(500).json(err)
    })
  },
//   get a single user
getUserById(req, res) {
    User.findOne({_id: req.params.userId})
}
};
