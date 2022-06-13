const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const db = require("./app/models/index");

// ENV
dotenv.config();

// CORS
var corsOptions = { origin: "http://localhost:3000" };

// #region Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// #endregion

// DB Connect
db.sequelize.sync({ force: true }).then(() => {
    initializeData();
});

function initializeData() {
    db.roles.create({
        id: 1,
        name: 'guest'
    });
    db.roles.create({
        id: 2,
        name: 'user'
    });
    db.roles.create({
        id: 3,
        name: 'admin'
    });
}

// Route
require('./app/routes/index.routes')(app);

// Initialize
app.listen(8000, () => {
    console.log(`Server is running on port ${process.env.PORT}.`);
});