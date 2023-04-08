const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const fs = require("fs").promises;
const path = require("path");
const Jimp = require("jimp");

const { User } = require("../models/userModels");

const { SECRET_KEY } = process.env;

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const register = async (req, res) => {
  const { password, email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      res.status(409).json({ message: "Email in use" });
      return;
    }

    const avatarURL = gravatar.url(email);
    const newUser = new User({ password, email, avatarURL });

    await newUser.setPassword(password);
    newUser.save();

    console.log(newUser);

    const payload = {
      id: newUser.id,
    };

    console.log(payload);

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "12h" });

    const hashPassword = newUser.password;

    res
      .status(201)
      .json({ user: { password: hashPassword, email, avatarURL, token } });
  } catch (error) {
    console.log(error);
    res.status(500).json("server error");
  }
};

const login = async (req, res) => {
  const { password, email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({ message: "Email or password is wrong" });
      return;
    }

    const comparePassword = await user.comparePassword(password);

    if (!comparePassword) {
      res.status(401).json({ message: "Email or password is wrong" });
      return;
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "12h" });

    await User.findByIdAndUpdate(user._id, { token });

    res.status(200).json({
      token,
      user: { email, subscription: user.subscription },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("server error");
  }
};

const getCurrent = async (req, res) => {
  console.log(req.user);
  const { email, subscription } = req.user;
  try {
    res.status(200).json({ user: { email, subscription } });
  } catch (error) {
    console.log(error);
    res.status(500).json("server error");
  }
};

const logout = async (req, res, next) => {
  const { _id } = req.user;

  try {
    if (!_id) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    await User.findByIdAndUpdate(_id, { token: "" });
    res.status(204).json();
  } catch (error) {
    console.log(error);
    res.status(500).json("server error");
  }
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, filename } = req.file;

  try {
    const avatarName = `${_id}_${filename}`;
    const resultUpload = path.join(avatarsDir, avatarName);
    const avatarImg = await Jimp.read(tempUpload);
    avatarImg.resize(250, 250).write(resultUpload);

    await fs.rename(tempUpload, resultUpload);

    const avatarURL = path.join("avatars", resultUpload);

    await User.findByIdAndUpdate(_id, { avatarURL });
    res.status(200).json({
      avatarURL,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("server error");
  }
};

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  updateAvatar,
};
