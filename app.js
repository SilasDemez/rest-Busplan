const express = require("express");
const app = express();

app.get("", function (req, res) {
  console.log("test");
  res.send("hello world");
});

app.listen(3000);
