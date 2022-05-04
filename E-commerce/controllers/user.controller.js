const db = require('../models');
const User = db.user;
const Product = db.product;
const Category = db.category;
const Purchase = db.purchase;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


module.exports.profile_get = (req, res) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'eyob ecommerce app', (err, decodedToken) => {
            res.render('profile');
        })
    } else {
        res.redirect('/login');;
    }
}

module.exports.profileUpdate_get = (req, res) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'eyob ecommerce app', (err, decodedToken) => {
            res.render('profileUpdate');
        })
    } else {
        res.redirect('/login');;
    }
}

module.exports.profileUpdate_post = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'eyob ecommerce app', (err, decodedToken) => {
            User.findByPk(decodedToken.id).then(user => {
                user.update({
                    fullName: req.body.fullName,
                    password: bcrypt.hashSync(req.body.password, 6),
                    location: req.body.location,
                    phoneNumber: req.body.phoneNumber
                });
                res.redirect('/profile');
            }).catch(err => {
                console.log(err);
            });
        }
        )
    };
};

module.exports.buyProduct_get = (req, res) => {
    const id = req.params.id;
    Product.findByPk(id, {
        include: ['category']
    }).then(data => {
        res.render('buyProduct', { product: data });
    }).catch(err => {
        res.send(err);
    });
};

module.exports.buyProduct_post = (req, res) => {
    const product_Id = req.params.id;
    const category_Id = req.body.productId;
    const user_Id = req.body.userId;
    const productPrice = parseInt(req.body.productPrice);
    const count = parseInt(req.body.count);

    Purchase.create({
        amouont: productPrice * count,
        count: count,
        accountNumber: req.body.accountNumber,
        userId: user_Id,
        productId: product_Id
    }).then(data => {
        console.log(JSON.stringify(data));
        res.redirect('/');
    }).catch(err => {
        res.send(err);
    })
    Category.findByPk(category_Id)
        .then(category => {
            category.update({
                amount: category.amount - count
            })
        });
}
