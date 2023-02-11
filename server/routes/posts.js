const { connection } = require("../config/config");

const create = (request, response) => {
  const { title, description, price, user_id, status } = request.body;
  connection.query(
    "INSERT INTO posts (title, description, price, user_id, status) VALUES ($1, $2, $3, $4, $5)",
    [title, description, price, user_id, status],
    (err, results) => {
      if (err) throw err;
      response.status(201).json({
        message: "Created Successfully",
        info: `Inserted ${results.rowCount} row(s)`,
      });
    }
  );
};
//create
//r
//update
//delete
const fetch = (request, response) => {
  connection.query(
    "SELECT * FROM posts WHERE status='Open' ORDER BY date_created DESC",
    (err, results) => {
      if (err) throw err;
      response.status(200).json(results.rows);
    }
  );
};

const fetchById = (request, response) => {
  const id = request.params.id;
  connection.query(
    "SELECT * FROM posts WHERE id = $1",
    [id],
    (err, results) => {
      if (err) throw err;
      response.status(200).json(results.rows);
    }
  );
};

const update = (request, response) => {
  const id = request.params.id;
  const { title, description, price } = request.body;
  connection.query(
    "UPDATE posts SET title = $1, description = $2, price = $3 WHERE ID = $4",
    [title, description, price, id],
    (err, results) => {
      if (err) throw err;
      response
        .status(201)
        .json({ message: "Updated Successfully.", info: results.rows });
    }
  );
};

const deletePost = (request, response) => {
  const id = request.params.id;
  connection.query("DELETE FROM posts WHERE ID = $1", [id], (err, results) => {
    if (err) throw err;
    response
      .status(203)
      .json({ message: "Deleted Successfully.", info: results.rowCount });
  });
};

const getPostByUserId = (request, response) => {
  const id = request.params.id;
  connection.query(
    "SELECT * FROM posts WHERE user_id = $1 AND status='Open' ORDER BY date_created DESC",
    [id],
    (err, results) => {
      if (err) throw err;
      response.status(200).json(results.rows);
    }
  );
};

const markAsRead = (request, response) => {
  const id = request.params.id;
  connection.query(
    "UPDATE posts SET status = $2 WHERE ID = $1",
    [id, "Archived"],
    (err, results) => {
      if (err) throw err;
      response.status(200).json(results.rows);
    }
  );
};

module.exports = {
  create,
  fetch,
  fetchById,
  update,
  deletePost,
  getPostByUserId,
  markAsRead,
};
