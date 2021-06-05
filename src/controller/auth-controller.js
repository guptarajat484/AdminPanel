const joi = require("joi");
const bcrypt = require("bcrypt");
const User = require("../../models/user-model");
const auth=require('../../middlewares/auth-middleware')
function signup(req, res) {
  const { name, email, password, conformpassword, role, mobilenumber } =
    req.body;

  console.log(typeof role);
}

function login(req, res) {}

module.exports = {
  signup,
  login,
};
