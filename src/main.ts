require("dotenv").config(); // read .env variables (for development)
const express = require('express');
//import cors from "cors"
const rApi = require('./api');

const PORT = Number(process.env.PORT) || 8000;
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//app.use(cors() as express.NextFunction);

// Routers
app.use('/api', rApi);

const server = app.listen(PORT, () => console.log(`Listening at port ${PORT}`));

module.exports = server ;