const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT ?? 3030;

app.get('/', (req, res) => {
    res.send("Hello Backend");
});

app.listen(port, () => {
    console.log('Listening on port ' + port);
})