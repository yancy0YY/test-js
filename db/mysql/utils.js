const mysql = require('mysql');
function testConnect(connectionConfig){
    if(!connectionConfig || !connectionConfig.user || !connectionConfig.password){
        console.error('error connection config');
        return
    }
    const connection = mysql.createConnection(connectionConfig);
    connection.connect()
}