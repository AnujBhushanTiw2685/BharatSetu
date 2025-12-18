const express = require('express');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());

const pageRoutes = require('./routes/pageRoutes');
app.use('/api/pages', pageRoutes);

app.get('/', (req, res) => {
    res.send('BharatSetu API is running');
})

module.exports = app;