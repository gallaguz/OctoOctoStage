const path = require('path');
const mysqlConnection = require('./config/mysql.js');

dbconnection = {
    ...mysqlConnection,
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        directory: path.join(__dirname, 'migrations'),
        tableName: 'migrations'
    },
    seeds: {
        directory: path.join(__dirname, 'seeds')
    }
}

module.exports = {
    development: dbconnection,
    staging: dbconnection,
    production: dbconnection
};
