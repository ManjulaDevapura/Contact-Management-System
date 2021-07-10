var { con } = require("../../database/config/transac");
var get = require('../../database/config/connection');

exports.updateContact = (req, res, next) => {
  let id = req.body.id;
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
        var sqlUp = `UPDATE contact SET name = '${name}', phone = '${phone}', address = '${address}', email = '${email}' WHERE id = ${id} ;`;
        con(sql, (err, result) => {
          if (err !== '') {
            res.status(404).json(err.code);
          }
          res.status(200).json(isValid);
        });
      } else {
        res.status(200).json(isValid);
      }
    }
  })

};

