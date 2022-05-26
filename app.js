require("dotenv").config();

const express = require("express");
const cors = require("cors");
const createError = require(`http-errors`);
const app = express();
const dbo = require("./app/db/conn");

app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// use router
app
  .use("/", require("./app/routers/index"))
  .use((req, res, next) => {
    next(new Error(`404: Endpoint is not exists!`));
  })
  .use((error, req, res, next) => {
    // Bắt lỗi tại đây, nếu dự án dùng cơ chết log lỗi
    // cho sandbox testing thì xử lí tại đây
    console.log(error);
    let message = error.message
      .split(`: `)
      .map((v) => (Number(v) ? Number(v) : v));
    let httpError = createError(...message);
    res.status(httpError.statusCode || 500).send(httpError);
  });

dbo.connectToServer(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }

  // start the Express server
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});
