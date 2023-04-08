const express = require("express");

const auth = require("../middlewares/auth");

// const upload = require("../middlewares/upload");

const {
  register,
  login,
  getCurrent,
  logout,
  // updateAvatar,
} = require("../controllers/userControllers");

const { registerValidation } = require("../middlewares/registerValidation");

const router = express.Router();

router.post("/register", registerValidation, register);

router.post("/login", registerValidation, login);

router.get("/current", auth, getCurrent);

router.post("/logout", auth, logout);

// router.patch("/avatars", auth, upload.single("avatar"), updateAvatar);

module.exports = router;
