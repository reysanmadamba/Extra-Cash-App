require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const posts = require("./routes/posts");
const auth = require("./routes/auth");
const users = require("./routes/users");
const jwt = require("jsonwebtoken");
const port = 8080;

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["x-access-token"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.user_id = decoded.id;
    next();
  });
};

// ROUTES FOR POSTS
app.get("/posts", posts.fetch);
app.get("/posts/:id", posts.fetchById);
app.post("/posts/create", posts.create);
app.delete("/posts/:id", posts.deletePost);
app.put("/posts/:id", posts.update);
app.get("/posts/user/:id", posts.getPostByUserId);
app.put("/posts/mark-as-read/:id", posts.markAsRead);

// ROUTES FOR AUTHENTICATION
app.post("/users/login", auth.login);
app.post("/users/register", auth.register);
app.post("/users/logout", auth.logout);

// ROUTES FOR GETTING USERS
app.get("/users/fetchUsers", users.fetchUsers);
app.get("/users/:id", users.fetchUserById);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
