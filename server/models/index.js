var db = require('../dbconnection');
var index = {
    getDistricts: function (id, callback) {

        db.many(`select * from mas_district md where md.scode = $1`, [id])
            .then(function (data) {
                // return callback(data);
                console.log('DATA:', data)
                return callback(data);
            })
            .catch(function (error) {
                console.log('ERROR:', error)
            })

    },
};
module.exports = index;