var { con } = require("../../database/config/transac");

exports.deleteContact = (req, res, next) => {
  let id = req.query.id;
  var sqlUp = `delete from contact WHERE id = ${id};`;

  con(sqlUp, (errUp, resultUp) => {
    if (errUp !== "") {
      res.status(400).json(errUp.code);
    } else {
      res.json("success");
    }
  });
};
