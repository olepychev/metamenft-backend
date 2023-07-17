const http = require('http');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const api = require("./src/api");

const app = express();
const PORT = 3307;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.use("/api", api);

const server = http.createServer(app);

app.listen(PORT, (error) => {
    if(!error)
        console.log("Server is Successfully Running, and App is listening the port " + PORT);
    else
        console.log("Error occurred, server can't start", error);
});