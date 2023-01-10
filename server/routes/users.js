const { connection } = require("../config/config");

const fetchUsers = (request, response) => {
  connection.query("SELECT * FROM users", (err, results) => {
    if (err) throw err;
    response.status(200).json(results.rows);
  });
};
const fetchUserById = (request, response) => {
  const id = request.params.id;
  connection.query(
    "SELECT * FROM users WHERE id = $1",
    [id],
    (err, results) => {
      if (err) throw err;
      response.status(200).json(results.rows);
    }
  );
};

module.exports = {
  fetchUsers,
  fetchUserById,
};
