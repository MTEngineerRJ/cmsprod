const db = require("../Config/dbConfig")

const authenticateUser=(req, res, next) =>{
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .send("Unauthorized: Missing or invalid Bearer token");
  }

  const token = authorizationHeader.substring("Bearer ".length);

  const sql = "SELECT * FROM Login WHERE Token = ?";
  db.query(sql, [token], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }

    if (result.length === 0) {
      return res.status(401).send("Unauthorized: Invalid token");
    }

    // If the token is valid, add user information to the request for later use
    req.user = {
      username: result[0].username,
      // Add any other relevant user information
    };

    // Proceed to the next middleware or route
    next();
  });
}

module.exports = authenticateUser;