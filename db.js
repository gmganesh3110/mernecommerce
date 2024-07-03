const mongoose = require("mongoose");
const mongourl = process.env.MONGO_DB_URL;

mongoose.connect(mongourl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const dbConnect = mongoose.connection;

dbConnect.on('error', (error) => {
    console.error("MongoDB connection error:", error);
});

dbConnect.once('open', () => {
    console.log("MongoDB connected successfully");
});

module.exports = dbConnect;
