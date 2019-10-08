const mysql = require('mysql');
const mysql_config = require('./config');

const CONNECT_POLL = mysql.createPool({ ...mysql_config, connectionLimit: 10 });

function executeSQL(sqlConfig) {
    return new Promise(
        function (resolve, reject) {
            CONNECT_POLL.getConnection(
                function (err, connection) {
                    if (err) {
                        reject(err.message);
                        return
                    }
                    connection.query(sqlConfig, function (err, results, fields) {
                        connection.release();
                        if (err) { reject(err.message); return }
                        resolve(results);
                    })
                }
            )
        }
    ).catch(exception => console.log(exception))
}

function close() {
    CONNECT_POLL.end()
}

module.exports = {
    executeSQL,
    close
}