const bcrypt = require('bcrypt');

//airtable
var Airtable = require('airtable');
var base = new Airtable({ apiKey: 'key6g32DRULc2ELR4' }).base('appTIhrtdSQzoGMIf');


module.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmpassword = req.body.password;




};