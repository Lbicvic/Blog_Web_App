const express = require("express");
const http = require("http");
require("dotenv").config();
const { connect } = require("./db/connection");
const cors = require("cors");
const api = require("./routes/api");

const app = express();
const server = http.createServer(app);
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

  server.listen(PORT, () => {
    console.log(`listening port ${PORT}`);
  });
})();
