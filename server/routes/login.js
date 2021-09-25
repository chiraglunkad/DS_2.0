var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const saltRounds = 10;
var CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
var db = require('../dbconnection');

router.post('/userlogin', function (req, res, next) {
    if (req.headers['x-forwarded-for']) {
        client_ip = req.headers['x-forwarded-for'].split(",")[0];

    } else if (req.connection && req.connection.remoteAddress) {
        client_ip = req.connection.remoteAddress;
    } else {
        client_ip = req.ip;
    }
    db.query(`select  DSG.NAME AS DESIGNATION_NAME, DSG.DSG_ID, UM.NAME AS USER_NAME,UM.USER_LOGIN_ID, UM.USER_ID, UM.PASSWORD, UM.mob_no , UM.email ,ODM.ORG_ID AS DEPTID, ORG.NAME AS DEPTNAME
    FROM M_USER_MST UM JOIN M_USR_ORG_DSG_MAP UODM ON UODM.USER_ID = UM.USER_ID
    JOIN M_ORG_DSG_MAP ODM ON ODM.ORG_DSG_ID = UODM.ORG_DSG_ID JOIN M_DESIGNATION_MST DSG ON DSG.DSG_ID = ODM.DSG_ID
    JOIN M_ORG_MST ORG ON ORG.ORG_ID = ODM.ORG_ID and UM.user_login_id =$1`, [req.body.username]).then(function (data) {

        if (typeof data[0] != 'undefined') {
            var passwordData = CryptoJS.AES.decrypt(req.body.password, 'ds_key');
            var password = passwordData.toString(CryptoJS.enc.Utf8);
            bcrypt.compare(password, data[0].password, function (err, result) {
                if (err) {
                    return res.json({
                        success: false
                    });
                }

                if (result) {
                    console.log(data[0].user_name);
                    // db.query('Insert into login_history(ip_address, user_id) values (?,?)', [client_ip, req.body.mobile], function (err, rows1) {
                    const JWTToken = jwt.sign({
                        user_id: data[0].user_id,
                        user_login_id: data[0].user_login_id,
                        name: data[0].user_name,
                        mob_no: data[0].mob_no,
                        email: data[0].email,
                        app_name: "DS"
                    }, 'DS%&986');
                    let dept = [];
                    data.forEach(element => {
                        dept.push({ "DEPTID": element.deptid, "DEPTNAME": element.deptname });
                    });
                    return res.status(200).json({ token: JWTToken, success: true, deptlist: dept });
                    // });
                } else {
                    return res.json({
                        success: false
                    });
                }

            });
        } else {
            return res.json({
                success: false
            });
        }
    });
});

router.get('/logout/:data?', function (req, res, next) {
    return db.query('update login_history set time_out = NOW() where id = ?', [req.params.data], function (err, rows1) {
        //req.session.destroy(); 
        return res.json();
    });
});

module.exports = router;