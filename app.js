require('dotenv').config();
const express = require('express');

const PORT = process.env.PORT;

const app = express();

app.get('/', (req, res) => {
    res.send('File uploader init ');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
