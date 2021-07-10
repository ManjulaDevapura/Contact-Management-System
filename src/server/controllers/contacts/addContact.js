var { con } = require("../../database/config/transac");
var get = require('../../database/config/connection');

exports.addContact = (req, res, next) => {
  let name = req.body.name;
  let phone = req.body.phone;
  let address = req.body.address;
  let email = req.body.email;

  const sqlCount = `SELECT count(*) as count FROM contact where email='${email}';`;

  get.con(sqlCount, (errCount, resultCount) => {
    if (errCount !== '') {
      res.status(404).json(err.code);
    } else {
      let noOfRecords = resultCount[0].count;
      var isValid = parseInt(noOfRecords) === 0 ? true : false;

      if (isValid) {
        var sql = `INSERT INTO contact (name, phone, address, email) VALUES ('${name}', '${phone}', '${address}', '${email}');`;
        con(sql, (err, result) => {
          if (err !== '') {
            res.status(404).json(err.code);
          }
          res.status(200).json(isValid);
        });
      } else{
        res.status(200).json(isValid);
      }
    }
  })
};
