const mongoose = require("mongoose");


mongoose.set('strictQuery', false);
const connectDatabase = async () => {
    await mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
    }).then((data) => {
        console.log(`MongoDb connected with server: ${data.connection.host}`);
    }).catch((err) => {
        console.log(err);
    });
};

module.exports = connectDatabase;

