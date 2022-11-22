const express = require('express');
const router = express.Router();
const schemas = require('../models/schemas.js');

/* GET home page. */
router.get('/', async(req, res) => {
  let anime = schemas.anime;
  let sesh = req.session;

  let animeResult = await anime.find({}).then( (animeData) => {
    res.render('index', {title:'anime App', data:animeData, search:'', loggedIn:sesh.loggedIn});
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

router.post('/q', async(req, res) => {
  let anime = schemas.anime;
  let q = req.body.searchInput;
  let animeData = null;
  let sesh = req.session;
  let qry = {name:{$regex:'^' + q, $options:'i'}};

  if (q != null) {
    let animeResult = await anime.find(qry).then( (data) => {
      animeData = data;
    });
  } else {
    q = 'Search';
    let animeResult = await anime.find({}).then( (data) => {
      animeData = data;
    });
  }

  res.render('index', {title:'Anime App', data:animeData, search:q, loggedIn:sesh.loggedIn});
});

module.exports = router;