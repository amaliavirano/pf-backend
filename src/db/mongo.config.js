const mongoose = require("mongoose");


const DB_NAME = "ecommerce"; 
const DB_USER = "amaliavirano";
const DB_PASSWORD = "amalia281120";
const DB_CLUSTER = "cluster0.1nwbzfe.mongodb.net";

const configConnection = {
  url: `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER}/`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: DB_NAME,
  },
};

const mongoDBconnection = async () => {
  try {
    await mongoose.connect(configConnection.url, configConnection.options);
    console.log(`=================================`);
    console.log(
      `======= URL: ${configConnection.url.substring(0, 20)} =======`
    );
    console.log(`==== DB: ${DB_NAME}`);
    console.log(`=================================`);
  } catch (error) {
    console.log(
      "🚀 ~ file: mongo.config.js:24 ~ mongoDBconnection ~ error:",
      error
    );

    throw new Error(error);
  }
};

module.exports = {
  configConnection,
  mongoDBconnection,
};