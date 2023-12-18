const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://deepakkh2907:tCCwBYk80hXcfU32@cluster0.6rxuvja.mongodb.net/?authMechanism=SCRAM-SHA-1";

const connectToMongo = () => {
    mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, dbName: "inotebook" })
        .then(() => {
            console.log("Connected to mongo");
        })
        .catch((error) => {
            console.error("Error connecting to mongo:", error);
        });
};

module.exports = connectToMongo;