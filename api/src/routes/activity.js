const { Router } = require('express');
const router = Router();
const { createActivity } = require('../controllers/activity');


router.post('/', createActivity);



module.exports = router;