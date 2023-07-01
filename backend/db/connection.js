const mongoose = require("mongoose");

async function connect() {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

mongoose.connection.once("open", () => {
  console.log("db is connected");
});

mongoose.connection.on("error", (error) => {
  console.error(error);
});

module.exports = { connect };
