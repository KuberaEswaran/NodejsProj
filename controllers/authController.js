const User = require("./../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const verifyUser = async (req, res) => {
  console.log("j");
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ message: "both username and password is required" });
  const isUser = await User.findOne({ username: username }).exec();
  if (!isUser)
    return res.status(401).json({ message: "username is not found" });
  const match = await bcrypt.compare(password, isUser.password);
  if (match) {
    const roles = Object.values(isUser.roles);
    const accessToken = jwt.sign(
      {
        userInfo: {
          username: isUser.username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: "30s" }
    );
    const refreshToken = jwt.sign(
      {
        username: isUser.username,
      },
      process.env.REFRESH_TOKEN_SECRET_KEY,
      { expiresIn: "1d" }
    );
    isUser.refreshToken = refreshToken;
    const result = await isUser.save();
    console.log(result);
    //console.log(userDb.users)
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ accessToken });
  } else res.status(401).json({ message: "invalid password" });
};

module.exports = { verifyUser };
