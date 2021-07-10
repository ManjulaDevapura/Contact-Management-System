var { con } = require('../../database/config/connection');

exports.validateEmail = async (req, res) => {

    const { email } = req.query;
    const sqlCount = `SELECT count(*) as count FROM contact where email='${email}';`;

    con(sqlCount, (errCount, resultCount) => {
        if (errCount !== '') {
            res.status(400).json(err.code);
        } else {
            let noOfRecords = resultCount[0].count;
            var isValid = parseInt(noOfRecords) === 0 ? true : false;

            res.status(200).json(isValid)
        }
    })

}
