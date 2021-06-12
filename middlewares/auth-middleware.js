const jwt = require("jsonwebtoken");

function authentication(req, res, next) {
  const token = req.header(auth);
  if (!token) {
    return res.status(422).send({ error: "Unauthorized Access" });
  }
  try {
    const decoded = jwt.decode(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(422).send({ error: err });
  }
}

module.exports = authentication;
