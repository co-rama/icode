const express = require('express');
const path = require('path');

const app = express();

app.use('/', (req, res, next) => {
    res.send('Welcome to Express API framework')
});

app.listen(3000);