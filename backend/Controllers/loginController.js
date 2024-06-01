const db = require("../Config/dbConfig");
const {logMessage} = require("../utils/LoggerFile");

const login = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    
    logMessage({
      type : "error",
      Function: "LOGIN",
      message: "User attempted to Login But user passed empty fields.",
      username: username,
      leadId: "",
      consoleInfo : "400 BAD REQUEST",
      info: `{ERRMESSAGE : {password : ${password}, username : ${username}}, STATUS : "400 BAD REQUEST"}`,
    });
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  const sql = "SELECT * FROM Login WHERE username = ? AND password = ?";
  db.query(sql, [username, password], (err, result) => {
    if (err) {
      logMessage({
        type: "error",
        Function: "LOGGING",
        message: "Got Error while logging to dashboard.",
        username: username,
        leadId: "",
        consoleInfo: `${err.status} ${err.details}`,
        info: `{ERRMESSAGE : ${err.details},STATUS : ${`${err.status} ${err.message}`}}`,
      });
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }

    if (result.length === 1) {
      logMessage({
        type : "info",
        Function: "LOGIN",
        message: "Logged In Successfully.",
        username: username,
        leadId: "",
        consoleInfo :"200 OK",
        info: "AUTHENTICATED",
      });
      return res.status(200).json({ message: "Login successful", result });
    } else {
      logMessage({
        type : "error",
        Function: "LOGIN",
        message: "User attempted to Login But user is not Authenticated.",
        username: username,
        leadId: "",
        consoleInfo : "401 UNAUTHORIZED",
        info: `{ERRMESSAGE : "Entered Invalid Credentials.", STATUS : "400 BAD REQUEST"}`,
      });
      return res.status(401).json({ error: "Invalid credentials" });
    }
  });
};

module.exports = { login };
