const authrouter = require("./auth-routes");
const adminroutes = require("./admin-routes");
function routes(app) {
  app.use("", authrouter)(app);
  app.use("/admin", adminroutes)(app);
}

module.exports = routes;
