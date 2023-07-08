"use strict";

/** Routes for authentication. */

const express = require("express");
const User = require("../models/user");
const {createUserJwt} = require("../utils/tokens")
const security = require("../middleware/security")
const router = express.Router();

// const security = require("../middleware/security")

// router.get("/me", async function (req, res, next) {
//   try {
//     const { email } = res.locals.user
//     const user = await User.fetchUserByEmail(email)
//     return res.status(200).json({ user })
//   } catch (err) {
//     next(err)
//   }
// })

router.get("/me", security.requireAuthenticatedUser, async function (req, res, next) {
  try {
    const { email } = res.locals.user
    const user = await User.fetchUserByEmail(email)
    const nutrition = await User.allNutrition(user.id);
    return res.status(200).json({ user, nutrition })
  } catch (err) {
    next(err)
  }
})

router.post ("/nutrition/create" , async function (req, res, next) {
try{
  const nutrition = await User.nutrition(req.body);
  return res.status(200).json({ nutrition });
} catch (err){
  next(err);
}

})

router.post("/login", async function (req, res, next) {
  try {
    const {userInfo, nutrition} = await User.authenticate(req.body);
    const token = createUserJwt(userInfo)
    return res.status(200).json({ userInfo, nutrition, token});
  } catch (err) {
    next(err);
  }
});

router.post("/register", async function (req, res, next) {
  try {
    console.log
    const user = await User.register(req.body);
    const token = createUserJwt(user)
    return res.status(201).json({ user, token });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
