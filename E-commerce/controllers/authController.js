const db = require('../models');
const User = db.user;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// handle errors 
const handleErrors = (err) => {
    console.log(err.message, err.code);
    const errObj = {};
    err.errors.map(er => {
        errObj[er.path] = er.message;
    });
    return errObj;
};
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'eyob ecommerce app', {
        expiresIn: maxAge
    });

};


module.exports.signup_get = (req, res) => {
    res.render('signup');
};

module.exports.login_get = (req, res) => {
    res.render('login');
};

module.exports.signup_post = (req, res) => {
    User.create({
        fullName: req.body.fullName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 6),
        location: req.body.location,
        gender: req.body.gender,
        phoneNumber: req.body.phoneNumber,
        role: req.body.role
    })
        .then(user => {
            const token = createToken(user.id);
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
            res.redirect('/');
        })
        .catch(err => {
            res.send({
                message: err.message || "some error occurred"
            });
        });

    // res.status(201).json({ user: user.id });
};

module.exports.login_post = (req, res) => {
    const { email, password } = req.body;

    User.findOne({
        where: {
            email
        }
    })
        .then(user => {
            if (!user) {
                // res.status(500).redirect('/login');
                res.status(500).send({ error: 'incorrect email' });
                // throw Error('incorrect email');
            }
            var passwordIsValid = bcrypt.compareSync(
                password,
                user.password
            );
            if (!passwordIsValid) {
                // res.status(500).redirect('/login');
                res.status(500).send({ error: 'incorrect password' });
                // throw Error('incorrect password');
            }
            const token = createToken(user.id);
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
            res.status(200).send({
                user: user.id
            })  
        })
        .catch(err => {
            res.status(500).send({});
        });
};

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');

}