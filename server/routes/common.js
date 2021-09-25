var express = require('express');
var router = express.Router();
var common = require('../models/common')

router.post('/save', function (req, res) {
    common[req.body.function_name](req.body, function (err, result) {
        if (err) {
            console.log(err);
            res.json(err);
        } else { res.json(result); }
    });
});
router.put('/update', function(req, res) {
    if (req.headers['x-forwarded-for']) {
        client_ip = req.headers['x-forwarded-for'].split(",")[0];

    } else if (req.connection && req.connection.remoteAddress) {
        client_ip = req.connection.remoteAddress;
    } else {
        client_ip = req.ip;
    }
    common[req.body.function_name](req.body, client_ip, function(err, result) {
        if (err) {
            console.log(err);
            res.json(err);
        } else { res.json(result); }
    });
});

router.get('/getFunction/:function_name/:p1?/:p2?/:p3?/:p4?', function (req, res) {
    common[req.params.function_name](req.params, function (err, result) {
        if (err) { res.json(err); } else { res.json(result); }
    });
});


module.exports = router;