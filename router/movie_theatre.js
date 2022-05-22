const express = require('express');
const router = express.Router();
const getModule = require('../module/movie_theatre');

router.get('/getdata',getModule.getMovie_Theatre);

router.post('/postdata',getModule.createMovie_Theatre);

router.delete('/remove/:movieid', getModule.deleteMovie_Theatre)


module.exports = router;