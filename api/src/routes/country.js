const { Router } = require('express');
const router = Router();
const { getCountries, getCountryById } = require('../controllers/country');


router.get('/', getCountries);

router.get('/:id', getCountryById);


module.exports = router;