const bcrypt = require("bcrypt");
const { connection } = require("../config/config");

const login = async (request, response) => {
  const { email, password } = request.body;

  connection.query(
    "SELECT * FROM users WHERE email = $1",
    [email],
    async (err, results) => {
      const rowCount = results.rowCount;
      if (rowCount) {
        // 1
        const user = results.rows[0]; // first and last name, email, id, and password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (isValidPassword) {
          response
            .status(200)
            .json({ message: "Login Successfully", login: true, info: user });
        } else {
          response
            .status(200)
            .json({ error: "Invalid Password", login: false });
        }
      } else {
        response
          .status(401)
          .json({ error: "User does not exist", login: false });
      }
    }
  );
};

const register = async (request, response) => {
  const { email, password, first_name, last_name } = request.body;
  const salt = await bcrypt.genSalt(10);
  const encrypted_password = await bcrypt.hash(password, salt);
  connection.query(
    "INSERT INTO users (email, password, first_name, last_name) VALUES ($1, $2, $3, $4)",
    [email, encrypted_password, first_name, last_name],
    (err, results) => {
      if (err) throw err;
      response.status(200).json({
        message: "User Registered.",
        info: `Inserted ${results.rowCount} row(s)`,
      });
    }
  );
};

module.exports = {
  login,
  register,
};
