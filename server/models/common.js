const bcrypt = require('bcryptjs');
const saltRounds = 10;
var db = require('../dbconnection');
// var format = require('dateformat');
var pg = require('pg');
var CryptoJS = require('crypto-js');
const { func } = require('../dbconnection');
var common = {

    getModulesCategoryReproduciblePriority: async function (data, callback) {
        return db.many(`select code_type_id , name from digisec2.m_ticket_value_mst  where code_type_id =$1  order by name`,[data.p1]).then(function (data) {
            // obj => {
            //     obj.done();
            // }
            return callback(data);
        })
        .catch(function (error) {
            console.log('ERROR:', error)
        })

    },
    getUsersofDept:async function(data, callback){
        return db.many(`SELECT DSG.NAME AS DESIGNATION_NAME, DSG.DSG_ID, UM.NAME AS USER_NAME,UM.USER_LOGIN_ID, UM.USER_ID, ODM.ORG_ID, ORG.NAME AS DEPT
        FROM M_USER_MST UM JOIN M_USR_ORG_DSG_MAP UODM ON UODM.USER_ID = UM.USER_ID
        JOIN M_ORG_DSG_MAP ODM ON ODM.ORG_DSG_ID = UODM.ORG_DSG_ID JOIN M_DESIGNATION_MST DSG ON DSG.DSG_ID = ODM.DSG_ID
        JOIN M_ORG_MST ORG ON ORG.ORG_ID = ODM.ORG_ID and ORG.org_id =1 and UM.user_id not in (623);`).then(function (data) {
            // obj => {
            //     obj.done();
            // }
            return callback(data);
        })
        .catch(function (error) {
            console.log('ERROR:', error)
        })

    },
    getDept:async function(data, callback){
        return db.many(`select mom.org_id , mom.name from m_org_mst mom where  mom.parent_id  is null order by mom.name`).then(function (data) {
            return callback(data);
        })
        .catch(function (error) {
            console.log('ERROR:', error)
        })

    },
    getDept_users:async function(data, callback){
        return db.many(`select distinct muodm.user_id, concat( mum.name ,' (', mdm.name,')') as user_name from m_org_dsg_map modm 
        inner join m_usr_org_dsg_map muodm on modm.org_dsg_id =muodm.org_dsg_id 
        inner join m_designation_mst mdm on mdm.dsg_id =modm.dsg_id 
        inner join m_user_mst mum on mum.user_id =muodm.user_id 
        where modm.org_id =$1`,[data.p1]).then(function (data) {
            return callback(data);
        })
        .catch(function (error) {
            console.log('ERROR:', error)
        })

    },

    changePassword: function (data, callback) {
        var passwordData = CryptoJS.AES.decrypt(data.password, 'hmis_key');
        var password = passwordData.toString(CryptoJS.enc.Utf8);
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
                if (err) console.log(err);
                if (data.from == 'forget') {
                    return db.query(`UPDATE mas_login SET password =? WHERE user_id =? `, [hash, data.mobile], callback);
                }
            });
        });
    },
}

module.exports = common;