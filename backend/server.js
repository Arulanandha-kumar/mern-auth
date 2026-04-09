const express = require("express");
const cors = require('cors');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const routes = require('./routes/authRoutes');

const mongoose = require('mongoose');
require('dotenv').config();


const app = express();
app.use(cors());
app.use(bodyParser.json());

// const secretKey = "abcdef";

// app.use(express.json());

// app.use((req, res, next) => {
//     console.log("path " + req.path + " method " + req.method);
//     next();
// });

// Routes
app.use('/api', routes)
// DB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));
const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
    res.send("hello world")
})

app.listen(PORT, ()=> console.log("Server running successfully....")) 