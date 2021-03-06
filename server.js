const mongoose = require('mongoose');
const express = require('express');
const connection = require('./config/connection');
const routes = require('./routes');
const path = require('path')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

connection.once('open', () => {
    app.listen(PORT, () => 
console.log(`===== Now listening on port ${PORT} =====`));
});


