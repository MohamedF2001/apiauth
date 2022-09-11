const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
const connectDB = require('./config/db')
const bodyParser = require('body-parser')
const routes = require("./routes/index")
const passport = require('passport')
const app = express();

connectDB()

/* app.use(express.json());
app.use(bodyParser.json())
app.use(router)
 */
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(routes)
app.use(passport.initialize())
require('./config/passport')(passport)

/* mongoose.connect('mongodb://localhost:27017/usersdb',
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
); */

/* const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
}); */

app.listen(3000, () => {
    console.log("Server is running at port 3000");
  });

