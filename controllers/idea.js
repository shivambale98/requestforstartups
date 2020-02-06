const jwt = require('jsonwebtoken');
//airtable
var Airtable = require('airtable');
var base = new Airtable({ apiKey: 'key6g32DRULc2ELR4' }).base('appTIhrtdSQzoGMIf');

exports.Postidea = (req, res, next) => {
    const name = req.body.name;
    const domain = req.body.domain;
    const problem = req.body.problem;
    const solution = req.body.solution;
    const token = req.body.jwttoken;

    var decodedtoken;
    try {
        decodedtoken = jwt.verify(token, 'heyphil123');
    } catch (err) {
        err.statusCode = 500;
        throw err;
    }
    if (!decodedtoken) {
        res.statusCode(402).json({ messege: 'Login in to submit ideas' });
    } else {
        const email = decodedtoken.email;
        let toprecord;

        base('users').select({
            fields: ["Email"],
            cellFormat: "json",
            view: "Grid view"
        })
            .eachPage((records) => {
                records.map(record => {
                    var { fields } = record;
                    var { Email } = fields;
                    if (Email === email) {
                        exist = true;
                        toprecord = record;
                    }
                });
                if (exist) {
                    base('ideas').create([{
                        "fields": {
                            "Name": name,
                            "Solution": solution,
                            "user": [toprecord.id],
                            "Domain": domain,
                            "Problem": problem
                        }
                    }], (err, results) => {
                        if (err) {
                            console.log(err);
                        } else {
                            //console.log(results);
                            res.redirect('http://localhost:3000/');
                        }
                    });

                }
            }, err => {
                console.log(err);
            });
    }


};