import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const auth = async (req, res, next) => {
  try {
    const token = req.cookies?.Token;

    // console.log("Auth Middleware Token:", token);

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    // Verify token
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // console.log("Auth Middleware Verified User:", verified);

    if (!verified) {
      return res.status(403).json({ message: "Invalid token" });
    }

    // Attach user info to request
    req.user = verified;
    next();
  } catch (error) {
    console.error("Auth Error:", error.message);
    return res.status(403).json({ message: "Token is invalid or expired" });
  }
};

export default auth;
