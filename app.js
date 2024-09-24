const express = require("express");
const connectToDb = require("./DB/dbService");

const router = require("./router/router");
const corsMiddleWare = require("./middlewares/cors");
const chalk = require("chalk");
const { handleError } = require("./utils/handleErrors");
const loggerService = require("./logger/loggerServices");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8181;


app.use(corsMiddleWare);
app.use(express.json());
app.use(loggerService());
app.use(express.static('./public'));

app.get('/', (req, res) => {
    const myPassword = process.env.MY_PASSWORD;
    res.send(myPassword)
})

app.use(router);

app.use((err, req, res, next) => {
    console.log(err);
    handleError(res, 500, 'internal error of the server')
})

app.listen(PORT, () => {
    console.log(chalk.yellow("app is listening to port " + PORT));
    connectToDb();
});