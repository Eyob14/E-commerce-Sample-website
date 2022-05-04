module.exports = (sequelize, Sequelize) => {
    const Catagory = sequelize.define("category", {
        name: {
            type: Sequelize.STRING
        },
        amount: {
            type: Sequelize.INTEGER
        }
    });
    return Catagory;
}