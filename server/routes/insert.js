var express = require('express');
var router = express.Router();
var insert = require('../models/insert')

router.post('/save', function (req, res) {
    if (req.headers['x-forwarded-for']) {
        client_ip = req.headers['x-forwarded-for'].split(",")[0];

    } else if (req.connection && req.connection.remoteAddress) {
        client_ip = req.connection.remoteAddress;
    } else {
        client_ip = req.ip;
    }

    insert[req.body.function_name](req.body, client_ip, function (err, result) {
        if (err) {
            console.log(err);
            res.json(err);
        } else { res.json(result); }
    });
});


module.exports = router;