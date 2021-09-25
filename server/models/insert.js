var db = require('../dbconnection');
// var format = require('dateformat');
var pg = require('pg');
const { doesNotMatch } = require('assert');

var insert = {
    createHelpDeskTicket(data, client_ip, callback) {
        return db.query(`insert into digisec2.t_ticket_detail (ticket_no, module, category, priority, reproducible_type, department_id, user_id, issue_desc, contact_number, reference, raised_by, flag, ip_address) values
            ((select CONCAT('HELPDESK-', max(id)+1,'-',`+ data.department + `,'-',` + new Date().getFullYear() + `) from digisec2.t_ticket_detail),$1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`, [data.modules, data.category, data.priority, data.isreproducible, data.department, data.user_id, data.issue_description, data.contact_no, data.reference, data.user_id, 'H', client_ip]).then(function (data) {
            return callback(data);
        })
            .catch(function (error) {
                console.log('ERROR:', error)
            })

    },

}

module.exports = insert;