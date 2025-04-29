const express = require("express");

const app = express();

app.get('/', (req, res) => {
  return res.send("Hello, azurepwq!");
});

const port = process.env.PORT || 3000;

console.log("Getting started...");
app.listen(port, () => console.log(`Server running on port ${port}`));

