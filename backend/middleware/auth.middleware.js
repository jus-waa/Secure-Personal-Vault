import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  // Try to get token from cookies or Authorization header
  let token = null;

  // Check cookie first
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }
  // Then check Authorization header
  else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // gives you access to req.user.id
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token." });
  }
};