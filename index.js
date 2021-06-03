const express = require("express");
const path = require("path");
const http = require("http");
const User = require("./users");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const port = 5000;
const app = express();
const server = http.createServer(app);

const socketConnection = require("./socket/socket");
socketConnection(server);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({ secret: "keyboard cat", resave: false, saveUninitialized: true })
);

app.use("/", express.static(path.join(__dirname, "public")));

const mongoose = require("mongoose");

const mongo_uri =
  "mongodb+srv://jagarcia:Ja100077@cluster0.gfo7d.mongodb.net/test";

mongoose.connect(
  mongo_uri,
  { useUnifiedTopology: true, useNewUrlParser: true },
  function (err) {
    if (err) {
      throw err;
    } else {
      console.log("Successfully connected");
    }
  }
);

app.post("/register", (req, res) => {
  const { username, password, name, role } = req.body;

  const newUser = new User({ name, username, password, role });

  newUser.save((err) => {
    if (err) {
      res.status(500).send("ERROR AL REGISTRAR EL USUARIO");
    } else {
      res.redirect("/login.html");
    }
  });
});

app.post("/authenticate", (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username }, (err, user) => {
    if (!user) {
      res.status(500).send("USUARIO NO EXISTENTE");
    } else {
      user.isCorrectPassword(password, (err, result) => {
        if (err) {
          res.status(500).send("ERROR AL AUTENTICAS");
        }

        if (result) {
          res.redirect("/");
        } else {
          res.status(500).json({ data: "bad request" });
        }
      });
    }

    if (err) {
      res.status(500).send("ERROR AL AUTENTICAR AL USUARIO");
      console.log(err);
    }
  });
});

server.listen(port, () => console.log(`listen on http://localhost:${port}`));
