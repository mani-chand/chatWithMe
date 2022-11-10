const  express= require('express')
const router = express.Router();
const {signup,signin,getAllUsers} = require('./../controllers/userController.js');
router.post('/',signup)
router.post('/validate',signin)
router.get('/users/:_id',getAllUsers)
module.exports = router