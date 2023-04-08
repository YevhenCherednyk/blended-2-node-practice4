const jwt = require("jsonwebtoken");

const { User } = require("../models/userModels");

const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  console.log(token);

  if (bearer !== "Bearer") {
    console.log("1");
    res.status(401).json({ message: "Not authorized" });
    return;
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user || !user.token || user.token !== token) {
      console.log("2");
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    req.user = user;
    next();
  } catch {
    console.log("3");
    res.status(401).json({ message: "Not authorized" });
    return;
  }
};

module.exports = auth;
