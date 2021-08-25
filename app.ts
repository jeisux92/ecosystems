import 'reflect-metadata';

import {
    Sequelize
} from "sequelize";
const express = require("express");
import { Container } from 'typedi';
const sequelize = new Sequelize('sqlite::memory');
Container.set('db', sequelize);


import associate from './models/associate';
const authRouter = require('./routes/auth')
const accountsRouter = require('./routes/accounts')
const errorHandler = require('./middlewares/errorHandler')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

require("dotenv").config();

const app = express();
const port = process.env.PORT; // default port to listen








app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(express.json(), async () => await associate())
app.use('/auth', authRouter)
app.use('/accounts', accountsRouter)


app.use(errorHandler)

// define a route handler for the default home page
app.use((req, res) => {
    res.status(404).send();
});

// start the Express server
app.listen(port, async () => {

    console.log(`server started at http://localhost:${port}`);
});


