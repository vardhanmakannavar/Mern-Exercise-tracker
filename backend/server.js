const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const exeRouter = require('./routes/exe');
const usersRouter = require('./routes/users');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: false, useCreateIndex: true});
const connection = mongoose.connection;
connection.once('open', ()=> {
    console.log("mongoDB database estabished successfully");
})

app.use('/exe', exeRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log("server is running on port:"+ port );

});