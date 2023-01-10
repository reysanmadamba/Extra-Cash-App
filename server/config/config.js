const Pool = require("pg").Pool;

const connection = new Pool({
  user: "postgres",
  host: "localhost",
  database: "social_media",
  password: "alessibeh00",
  port: 5432,
});

module.exports = {
  connection,
};
