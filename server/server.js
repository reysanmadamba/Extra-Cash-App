const app = require("express")();
const bodyParser = require("body-parser");
const posts = require("./routes/posts");
const auth = require("./routes/auth");
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ROUTES FOR POSTS
app.get("/posts", posts.fetch);
app.get("/posts/:id", posts.fetchById);
app.post("/posts/create", posts.create);
app.delete("/posts/:id", posts.deletePost);
app.put("/posts/:id", posts.update);

// ROUTES FOR AUTHENTICATION
app.post("/users/login", auth.login);
app.post("/users/register", auth.register);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
