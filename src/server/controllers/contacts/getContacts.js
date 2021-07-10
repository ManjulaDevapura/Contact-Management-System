var { con } = require('../../database/config/connection');


exports.getContacts = async (req, res) => {

    const { pages, page, sort, filtered } = req.body;
 
    // sort
    var sortingSql = '';
    if (sort !== undefined) {
        if (sort.length > 0) {
            sortingSql = 'ORDER BY '
        } else if (sort.length === 0) {
            sortingSql = 'ORDER BY id';
        }
        for (var a = 0; a < sort.length; a++) {
            let sortingType = ' ASC';
            if (sort[a].desc === true) {
                sortingType = ' DESC';
            }
            sortingSql = sortingSql + sort[a].id + sortingType
            if (sort.length > (a + 1)) {
                sortingSql = sortingSql + ', '
            }
        }
    }

    // search
    var searchingSql = '';
    if (filtered !== undefined) {
        if (filtered.length > 0) {
            searchingSql = 'WHERE '
        }
        for (var x = 0; x < filtered.length; x++) {
            searchingSql = searchingSql + filtered[x].id + " LIKE '%" + filtered[x].value + "%'";
            if (filtered.length > (x + 1)) {
                searchingSql = searchingSql + 'AND '
            }
        }
    }

    const sqlCount = `SELECT count(*) as count FROM contact
                        ${searchingSql}
                        ${sortingSql};`;

    con(sqlCount, (errCount, resultCount) => {
        if (errCount !== '') {
            res.status(400).json(err.code);
        } else {
            let noOfRecords = resultCount[0].count;
            let reminderOfRows = noOfRecords % pages;
            let noOfPages = parseInt(noOfRecords / pages) + (reminderOfRows > 0 ? 1 : 0)
            let rowNo = page > 0 ? (pages * page) + ',' : '';

            const sql = `SELECT * FROM contact
                            ${searchingSql}
                            ${sortingSql}
                            LIMIT ${rowNo}${pages};`;

            con(sql, (err, result) => {
                if (err !== '') {
                    res.status(400).json(err.code);
                } else {
                    const resData = {
                        rows: result,
                        pages: noOfPages
                    };
                    res.status(200).json(resData)
                }

            })
        }
    })

}
