const jwt = require("jsonwebtoken");

function authentication(req, res, next) {
  const token = req.header("auth");
  if (!token) {
    return res.status(422).send({ error: "Invalid Token" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(422).send({ Error: "Unauthorized Access" });
    }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(422).send({ error: err });
  }
}

module.exports = authentication;
