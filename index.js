const express = require("express");
const jwt = require('jsonwebtoken')
const cors = require('cors');

require("dotenv").config();
const { connection } = require("./config/database");
const { notesRouter } = require("./routes/notes.route");
const { UserRouter } = require("./routes/user.route");


const app = express();
app.use(express.json());
app.use(cors({'origin':"*"}));
app.use('/notes',notesRouter);
app.use('/user',UserRouter);

let port = process.env.port || 4500;

app.get("/", (req, res) => {
  res.send("users registration authentication System/Home page");
});



app.listen(port, async () => {
  try {
    await connection;
    console.log("listening on port " + port + " connected to users database");
  } catch (error) {
    console.error(error);
  }
});
