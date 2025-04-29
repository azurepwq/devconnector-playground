const express = require("express");
const mongoose = require("mongoose");


const app = express();

// MongoDB config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose.
  connect(db).
  then(() => console.log('MongoDB Connected')).
  catch(err => console.log(err));

app.get('/', (req, res) => {
  return res.send("Hello, azurepwq!");
});

// Use Routes
const { profile, posts, users } = require('./routes/api');
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);


const port = process.env.PORT || 3000;

console.log("Getting started...");
app.listen(port, () => console.log(`Server running on port ${port}`));

