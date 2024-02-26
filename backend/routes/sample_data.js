var express = require('express');

var router = express.Router();

var database = require('../database');

router.get("/", function (request, response, next) {
    var query="select * from sample order by roll ";
    database.query(query, function(error, data){
        if(error){
            throw error;
        }
        else{
            response.render()
        }
    })
});

router.get("/add", function (request, response, next) {
    response.send("add sampled data")
});

module.exports = router;