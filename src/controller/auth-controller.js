const joi = require("joi");
const bcrypt = require("bcrypt");
const referralCodeGenerator = require("referral-code-generator");
const User = require("../../models/user-model");

const jwt = require("jsonwebtoken");

async function signup(req, res) {
  try {
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
      const hash = bcrypt.hashSync(password, 10);
      const user = new User({
        name,
        email,
        password: hash,
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
        email,
      });

      if (mail) {
        return res.send("User is Already Exist");
      }
      const invite = await User.findOne({ invitecode });

      if (!invite) {
        return res.send("Invalid Invite Code");
      }
      const hash = bcrypt.hashSync(password, 10);
      if (invitecode.localeCompare(invite)) {
        const user = new User({
          name,
          email,
          password: hash,
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
  } catch (err) {
    return res.send({ Error: err });
  }
}

async function login(req, res) {
  try {
    let signin = joi.object({
      email: joi.string().email().required(),
      password: joi
        .string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
    });
    let { error } = signin.validate(req.body);
    if (error) {
      return res.send(error.details[0].message);
    }
    const { email, password } = req.body;
    const user = await User.findOne({
      email,
    });
    if (!user) {
      return res.send({ Error: "Please Enter Valid Email" });
    }
    const compare = await bcrypt.compare(password, user.password);
    if (!compare) {
      return res.status(422).send({ Error: "Invalid Email Password" });
    }
    const accessToken = jwt.sign(
      { id: user._id, isadmin: user.isadmin },
      process.env.JWT_SECRET
    );

    return res.send({ accesstoken: accessToken });
  } catch (err) {
    return res.send({ Error: err });
  }
}

module.exports = {
  signup,
  login,
};
