const express = require("express");
require("dotenv").config();
const { connect } = require("./db/connection");
const cors = require("cors");
const api = require("./routes/api");

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: "http://127.0.0.1:5173",
  })
);

app.use(express.json({ limit: "40mb" }));
app.use(api);

(async function () {
  await connect();

  app.listen(PORT, () => {
    console.log(`listening port ${PORT}`);
  });
})();
