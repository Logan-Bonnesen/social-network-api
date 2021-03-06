const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');


// /users or /user?
// /thought or /thoughts?
router.use('/user', userRoutes);
router.use('/thought', thoughtRoutes);

module.exports = router;