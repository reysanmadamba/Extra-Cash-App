require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { connection } = require("../config/config");

let refreshTokens = [];

const generateAccessToken = ({ id }) => {
  return jwt.sign({ id: id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1y",
  });
};

const refreshToken = () => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_ACCESS_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ id: user.id });
    res.json({ accessToken: accessToken });
  });
};

const logout = () => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204);
};

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
          const access_token = generateAccessToken({ id: user.id });
          const refresh_token = jwt.sign(
            user.id,
            process.env.REFRESH_ACCESS_TOKEN
          );
          refreshTokens.push(refreshToken);
          response.status(200).json({
            message: "Login Successfully",
            login: true,
            info: user,
            access_token,
            refresh_token,
          });
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
  logout,
};
