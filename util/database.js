const mongoose = require("mongoose");
let _db;

const User = require("../models/user");
const mongoConnect = (callback) => {
  mongoose
    .connect("mongodb://localhost:27017/localHost", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((client) => {
      console.log("MongoDb Connected");
      _db = client.connection.db;
      callback();
    })
    .then((result) => {
      User.findOne().then((user) => {
        if (!user) {
          const user = new User({
            name: "Kumar",
            email: "k@bharat.com",
            cart: {
              items: [],
            },
          });
          user.save();
        }
      });
    })
    .catch((err) => {
      console.error("Connection error", err);
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
