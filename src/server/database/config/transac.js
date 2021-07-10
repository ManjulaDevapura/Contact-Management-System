var pool = require('./config');
var { drop } = require('./dropCon')

exports.con = async (sql, cb) => {

    console.log(sql);

    await pool.getConnection((err, connection) => {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('----------------------');
        console.log('connected as id ' + connection.threadId);
        console.log('----------------------');
        // if (connection.threadId != null) {
        connection.beginTransaction(err => {
            if (err) {
                cb(err, '');
                throw err;
            } else {
                connection.query(sql, (err, result) => {
                    if (err) {
                        return connection.rollback(() => {
                            cb(err, '');
                            throw err;
                        })
                    } else {
                        connection.commit(() => {
                            if (err) return connection.rollback(() => {
                                cb(err, '');
                                throw err;
                            })
                            connection.release();
                            console.log('------------');
                            console.log('sql commited');
                            console.log('------------');
                            cb('', result.insertId);
                        })
                    }
                })
            }
        })

        // drop(connection);
        // connection.end(err => {
        //     if (err) { console.log(`db error: ${err}`); connection.destroy(); }

        //     console.log(`db closed..!`);
        // })
        // }

    });

    // }
}