const User = require("../../models/usermodels/usersModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.JWTSECRETE;

const registerUser = async (req, res) => {
  let email = req.body.email;
  console.log(email)
  const usr = await User.findOne({ email: email });
  if (!usr) {
    let user = new User({
      name: req.body.name,
      email: req.body.email,
      passwordHash: bcrypt.hashSync(req.body.passwordHash + "mysecrit"),
      phone: req.body.phone,
      isAdmin: req.body.isAdmin,
      country: req.body.country,
    });
    user = await user.save();
    if (!user) {
      return res.status(400).send({msg:"the user cannot be created"});
    } else {
      console.log(user.id);
      const token = jwt.sign(
        {
          userId: user.id,
          isAdmin: user.isAdmin,
        },
        secret,
        {
          expiresIn: "1d",
        }
      );
      res.status(201).send({msg:"Register sucessfully.... ", user: user.name, token });
    }
  } else {
    return res.status(201).send({ msg: "Email already exists ..." });
  }
};



// user Login 

const userLogin = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  console.log(req.body.passwordHash);
  if (!user) {
    return res.status(400).send({msg:"the user not found"});
  }
console.log(user.passwordHash)
  if (
    user &&
    bcrypt.compareSync(req.body.passwordHash + "mysecrit", user.passwordHash)
  ) {
    // console.log(user.id);
    const token = jwt.sign(
      {
        userId: user.id,
        isAdmin: user.isAdmin,
      },
      secret,
      {
        expiresIn: "1d",
      }
    );
    res.status(200).send({ msg:"Login success...!",user: user.email, token });
  } else {
    return res.status(400).send({msg:"Email and password is wrong"});
  }
}
module.exports = { registerUser, userLogin };
