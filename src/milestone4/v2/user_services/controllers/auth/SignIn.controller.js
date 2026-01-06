import User from "../../models/User.models.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const signIn = async (req, res) => {
  const { email, password } = req.body;

  console.log(req.body);
  if (!email || !password) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }

  try {
    const user = await User.findOne({ email: email }).select("password");
    // console.log(user);
    if (!user) return res.status(401).json({ message: "User not found" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Incorrect password" });
    const Token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.cookie("Token", Token, {
      httpOnly: true,
      secure: true, // 🔥 REQUIRED (HTTPS only)
      sameSite: "lax", // 🔥 REQUIRED for cross-site
      path: "/",
    });
    res.status(200).json({ message: "Logged in successfully", user: { user } });
  } catch (error) {
    console.error(error.message);
    res.status(501).send("Server Error");
  }
};

export default signIn;
