require("dotenv").config();
const express = require("express");
var cors = require('cors')
const app = express();
const mongoose = require("mongoose");
const path = require('path');
const userRoutes = require('./server/routes/user');
const postRoutes = require('./server/routes/post');
//console.log(process.env.dbURL);
mongoose.connect(process.env.dbURL)
  .then(console.log("DB Connected!!"))
  .catch(error => console.log(error));

app.use(express.json());
app.use(cors({origin:'*'}))
app.use(express.static(__dirname + "/client/build"));
app.get('/', (_req, res) => res.sendFile(path.join(__dirname, '/client/build', 'index.html')));

app.use(function(_req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin,X-Requested-Width,Content-Type,Accept,Authorization");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
  next();
});

app.use('/user', userRoutes);
app.use('/post', postRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));
