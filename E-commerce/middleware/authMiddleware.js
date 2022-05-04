const jwt = require('jsonwebtoken');
const db = require('../models')
const User = db.user;

// const requireAuth = (req, res, next) => {
//     const token = req.cookies.jwt;

//     if (token) {
//         jwt.verify(token, 'eyob ecommerce app', (err, decodedToken) => {
//             if (err) {
//                 console.log(err.message);
//                 res.redirect('/login');
//             }
//             else {
//                 console.log(decodedToken);
//                 next();
//             }
//         });
//     }
//     else {
//         res.redirect('/login');
//     }
// };


const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'eyob ecommerce app', (err, decoded) => {
            if (err) {
                res.redirect('/login');
            }
            else {
                next();
            }
        });
    }
    else {
        res.redirect('/login');
    }
};
// check wheather the logged in user is admin or not
const isAdmin = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'eyob ecommerce app', (err, decoded) => {
            if (err) {
                res.redirect('/login');
            }
            else {
                User.findByPk(decoded.id).then(user => {
                    if (user && user.role == 'admin') {
                        next();
                        // res.redirect('/');
                        return;
                    }
                    else {
                        res.redirect('/productList');
                    }
                });
            }
        });
    }
    else {
        res.status(403).redirect('/login');send({
            message: "no token provided"
        })
    }
};
// check current user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'eyob ecommerce app', async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                next();
            }
            else {
                console.log(decodedToken);
                let user = await User.findByPk(decodedToken.id);
                // console.log('user: ', user);
                res.locals.user = user;
                next();
            }
        });
    }
    else {
        res.locals.user = null;
        next();
    }

}


module.exports = { requireAuth, isAdmin, checkUser };