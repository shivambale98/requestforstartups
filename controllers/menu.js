const jwt = require('jsonwebtoken');

exports.getmenu = (req, res, next) => {
    const token = req.body.token;
    console.log(req.body);
    var decodedtoken;
    try {
        decodedtoken = jwt.verify(token, 'heyphil123');
    } catch (err) {
        // res.json({
        //     loglink: '/login',
        //     logstatus: 'Login',
        //     signlink: '/signup',
        //     signstatus: 'Signup'
        // });
    }
    if (!decodedtoken) {
        res.json({
            loglink: '/login',
            logstatus: 'Login',
            signlink: '/signup',
            signstatus: 'Signup'
        });
        //console.log(decodedtoken);
    } else {
        console.log(decodedtoken);
        const loggedin = decodedtoken.loggedin;
        if (loggedin) {
            res.json({
                loglink: '/logout',
                logstatus: 'Logout',
                signlink: '/myideas',
                signstatus: 'Myideas'
            });
        } else {
            res.json({
                loglink: '/login',
                logstatus: 'Login',
                signlink: '/signup',
                signstatus: 'Signup'
            });
        }
    }

};