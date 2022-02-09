const router = require("express").Router();

const {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userController");

// localhost:3000/api/users/userId
router.route("/").get(getAllUsers).post(addUser);
router.route("/:userId").get(getUserById).put(updateUser).delete(deleteUser);
router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);

module.exports = router;
