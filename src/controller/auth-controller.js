const joi = require("joi");
const bcrypt = require("bcrypt");
const referralCodeGenerator = require("referral-code-generator");
const User = require("../../models/user-model");
const auth = require("../../middlewares/auth-middleware");

async function signup(req, res) {
  const register = joi.object({
    name: joi.string().min(3).max(50).required(),
    email: joi.string().email().required(),
    password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    cpassword: joi.ref("password"),
    phone: joi.number().integer().required(),
    isadmin: joi.boolean(),
    invitecode: joi.string().length(6),
  });

  const { error } = register.validate(req.body);
  if (error) {
    return res.send(error.details[0].message);
  }

  const { name, email, password, cpassword, isadmin, phone, invitecode } =
    req.body;
  if (isadmin === true) {
    const invitecode = referralCodeGenerator.alpha("uppercase", 6);
    const hash = bcrypt.hashSync(password,10);
    const user = new User({
      name,
      email,
      password:hash,
      isadmin,
      phone,
      invitecode,
    });
    user
      .save()
      .then(() => {
        return res.send("Admin Register Succesfully");
      })
      .catch((error) => {
        return res.send("Registration Failed");
      });
  } else {
    const mail = await User.findOne({
      email
    })
    console.log(mail);
    if (mail) {
      return res.send("User is Already Exist");
    }
    const invite = await User.findOne({invitecode});

    if (!invite) {
      return res.send("InviteCode Dosen't Exist");
    }
    const hash = bcrypt.hashSync(password,10);
    if (invitecode.localeCompare(invite)) {
      const user = new User({
        name,
        email,
        password:hash,
        isadmin,
        phone,
        invitecode,
      });
      user
        .save()
        .then(() => {
          return res.send("User Register Succesfully");
        })
        .catch((error) => {
          return res.send("Registration Failed");
        });
    } else {
      return res.send("Please Enter Valid Invite Code");
    }
  }
}

function login(req, res) {}

module.exports = {
  signup,
  login,
};
