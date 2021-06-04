const authcontroller = require("../controller/auth-controller");

function auth(app) {
  app.post("/signup", authcontroller.signup());
  app.post("/login", authcontroller.login());
}

module.exports = auth;
