const mongoose = require('mongoose')
const dbConfig = require('./dbconfig')

const uri = "mongodb+srv://MoussF:mohamed2001@cluster0.rde6y.mongodb.net/authflutter?retryWrites=true&w=majority";

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(uri/* dbConfig.database */, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useFindAndModify: false
        })
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    }
    catch (err) {
        console.log(err)
        //process.exit(1)
    }
}

module.exports = connectDB

/* mongoose.connect(dbConfig.database,
    {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    }
  ); */