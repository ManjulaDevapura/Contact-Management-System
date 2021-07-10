var pool = require('./config');
var { drop } = require('./dropCon')

exports.con = async (sql, cb) => {

    console.log(sql);

    await pool.getConnection((err, connection) => {
        if (err) {
            console.error('error connecting: ' + err.stack);
            cb(err, '')
            return;
        }
        console.log('----------------------');
        console.log('connected as id ' + connection.threadId);
        console.log('----------------------');
        connection.query(sql, (err, result) => {
            connection.release();
            if (err) { console.log(`Db execute error: ${err}`); cb(err, ''); throw err; }
            console.log(`result :${JSON.stringify(result)}`);
            cb('', result);
        })
    });
}