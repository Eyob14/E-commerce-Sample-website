const db = require('../models');
const Product = db.product;
const Category = db.category;


module.exports.product_get = (req, res) => {
    res.render('newProduct');
};

module.exports.product_post = (req, res) => {
    Product.create({
        name: req.body.name,
        price: parseInt(req.body.price),
        description: req.body.description,
        imageAddress: req.body.image,
        categoryId: parseInt(req.body.category)
    }, {
        include: [{
            model: Category,
            as: 'category'
        }]
    }).then(result => {
        res.redirect('/');
        // console.log(JSON.stringify(result));
    }).catch((err) => {
        console.log(err);
    })
    Category.findByPk(parseInt(req.body.category))
        .then(result => {
            result.update({
                amount: result.amount + 1
            })
        })
};


module.exports.productList_get = (req, res) => {
    Product.findAll({
        include: ['category']
    }).then(results => {
        res.render('productList', { products: results });
    }).catch(err => {
        res.send(err);
    });
}
module.exports.productDetail_get = (req, res) => {
    const id = req.params.id;
    Product.findByPk(id, {
        include: ['category']
    }).then(data => {
        res.render('productDetail', { product: data });
    }).catch(err => {
        res.send(err);
    });
}