const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const schemas = require('../models/schemas.js');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index.ejs', { title: 'Anime App' });
});

router.get('/:id', async(req, res) => {
    let sesh = req.session;

    if (!sesh.loggedIn) {
        res.render('anime', {title:'Edit', loggedIn:false, error:'Invalid Request'});
    } else {
        let id = req.params.id;
        let err = '';

        let anime = schemas.anime;
        let qry = {_id:id};

        let itemResult = await anime.find(qry).then( (itemData) => {
            if (itemData == null) {
                err = 'Invalid ID';
            }

            res.render('anime', {title:'Edit Anime', item:itemData, loggedIn:sesh.loggedIn, error:err});
        });
    }
});

router.get('/delete/:id', async(req, res) => {
    let sesh = req.session;

    if (!sesh.loggedIn) {
        res.redirect('/login');
    } else {
        let anime = schemas.anime;
        let animeId = req.params.id;
        let qry = {_id:animeId};
        let deleteResult = await anime.deleteOne(qry);
        res.redirect('/');
    }
});

router.post('/save', async(req, res) => {
    let sesh = req.session;

    if (!sesh.loggedIn) {
        res.redirect('/login');
    } else {
        let animeId = req.body.animeId;
        let animeName = req.body.animeName;
        let animeIcon = req.body.animeIcon;
        let animeUrl = req.body.animeUrl;
        let anime = schemas.anime;

        let qry = {_id:animeId};

        let saveData = {
            $set: {
                name: animeName,
                icon: animeIcon,
                watchUrl: animeUrl
            }
        }

        let updateResult = await anime.updateOne(qry, saveData);

        res.redirect('/');
    }
});

router.post('/new', async(req, res) => {
    let sesh = req.session;

    if (!sesh.loggedIn) {
        res.redirect('/login');
    } else {
        let animeName = req.body.animeName;
        let animeIcon = req.body.animeIcon;
        let animeUrl = req.body.animeUrl;
        let anime = schemas.anime;

        let qry = {name:animeName};

        let searchResults = await anime.findOne(qry).then( async(userData) => {
            if (!userData) {
                // ok to add anime
                let newAnime = new schemas.anime({
                    name: animeName,
                    icon: animeIcon,
                    url: animeUrl
                });

                let saveAnime = await newAnime.save();
            }
        });

        res.redirect('/');
    }
});

module.exports = router;