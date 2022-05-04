const express = require("express");
const cors = require("cors");
const authRoutes = require('./routes/authRouter');
const userRoutes = require('./routes/userRouter');
const productRoutes = require('./routes/productRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require("./middleware/authMiddleware");
const db = require("./models");
const bcrypt = require('bcrypt');

const app = express();


var corsOptions = {
    origin: "http://localhost:8081"
};

app.set('view engine', 'ejs');
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser())

db.sequelize.sync({ force: true }).then(() => {
    console.log('connected successfully');
    initial();
    // set port, listen for requests
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
    });
});

// adding an admnistrator to the database here
Category = db.category;
User = db.user;
function initial() {
    Category.create({
        name: 'clothes',
        amount: 0
    });
    Category.create({
        name: 'electronics',
        amount: 0
    });
    Category.create({
        name: 'cosmotics',
        amount: 0
    });
    User.create({
        fullName: 'admin',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 6),
        role: 'admin'
    });
}


//  checkes the existence of the user on the app in all routes
app.get('*', checkUser);

app.use(authRoutes);
app.use(userRoutes);
app.use(productRoutes);