const jwt = requier('jsonwebtoken');
const db = require('../models');
const User = db.user;


verifyToken = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(403).send({
            message: "no token provided"
        });
    }
    jwt.verify(token, 'eyob ecommerce app', (err, decoded) => {
        if (err) {
            res.cookie('jwt', '', { maxAge: 1 });
            return res.status(401).redirect('/');
        }
        req.userId = decoded.id;
        next();
    });
};
isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        if (user.role == 'admin') {
            next();
            return;
        }
        res.status(403).send({
            message: "require admin role"
        });
        return;
    });
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin
};

module.exports = authJwt;