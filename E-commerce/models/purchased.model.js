module.exports = (sequelize, Sequelize) => {
    const Purchase = sequelize.define("purchase", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        amount: {
            type: Sequelize.STRING,
        },
        count: {
            type: Sequelize.INTEGER
        },
        accountNumber: {
            type: Sequelize.STRING
        }
    });
    return Purchase;
}