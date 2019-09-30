//Setting environment variable at app start
import dotenv from 'dotenv';
dotenv.config({
    path: __dirname + '/../config/dev.env'
})

//Now other imports
import express from 'express';

//Connect to Postgres database
require('./db/sequelize');

//Initializing app variable
const app = express();
app.use(express.json());

//Routers go here
app.use(require('./routes/user_route'));
app.use('*', (req, res) => {
    res.json({
        "Sorry": "404 Not found!"
    });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
});