const mongoose = require('mongoose');
const schema = mongoose.Schema;

const animeSchema = new schema({
    name: {type:String, require:true},
    icon: {type:String, require:true},
    url: {type:String, require:true},
    entryDate: {type:Date, default:Date.now}
});

const usersSchema = new schema({
    email: {type:String, require:true},
    pwd: {type:String, require:true},
    entryDate: {type:Date, default:Date.now}
});

const anime = mongoose.model('anime', animeSchema, 'anime');
const users = mongoose.model('users', usersSchema, 'users');
const mySchemas = {'anime':anime, 'users':users};

module.exports = mySchemas;