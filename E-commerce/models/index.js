const config = require("../config/db.config");
const Sequelize = require("sequelize");
// const bcrypt = require('bcrypt');
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: false,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        },
        logging: false
    }
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("./user.model.js")(sequelize, Sequelize);
db.product = require('./product.model.js')(sequelize, Sequelize);
db.purchase = require('./purchased.model.js')(sequelize, Sequelize);
db.category = require('./catagory.model.js')(sequelize, Sequelize);

db.category.hasMany(db.product, {
    foreignKey: 'categoryId',
    as: 'product'
});

db.product.belongsTo(db.category, {
    foreignKey: 'categoryId',
    as: "category",
});

db.user.belongsToMany(db.product, {
    through: db.purchase,
    as: 'product',
    foreignKey: 'userId'
});
db.product.belongsToMany(db.user, {
    through: db.purchase,
    as: 'user',
    foreignKey: 'productId'
});

module.exports = db;