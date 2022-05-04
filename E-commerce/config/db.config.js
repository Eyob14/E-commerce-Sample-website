module.exports = {
    HOST: "localhost",
    USER: "", // enter your mysql username
    PASSWORD: "", // enter your mysql user password,
    DB: "test",  // create a database "create database test" using the following command 
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};