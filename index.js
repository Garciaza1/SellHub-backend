const express = require('express');
const router = require('./Router');
const mongoose = require('./config/db');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json()); 


app.use('/', router);  


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
