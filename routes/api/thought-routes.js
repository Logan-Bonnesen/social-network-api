const router = require('express').Router();

const { getAllThoughts, getThoughtById, addThought, updateThought, deleteThought, addReaction, deleteReaction } = require('../../controllers/thoughtController');

router.route('/').get(getAllThoughts).post(addThought);
router.route('/:thoughtId').get(getThoughtById).put(updateThought).delete(deleteThought);
router.route(':thoughtId/reactions/:reactionId').post(addReaction).delete(deleteReaction);

module.exports = router;