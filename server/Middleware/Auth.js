import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const checkAuth = (req, res, next) => {
  // Extract the token from the Authorization header
  const authHeader = req.headers.authorization;
  // console.log(authHeader);cls
  

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Token is missing or invalid format" });
  }

  // Extract the token from the Authorization header
  const token = authHeader.split(" ")[1];

  // Verify the token
  jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
    if (error) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    // Token is valid, proceed to the next middleware or route handler
    req.user = decoded; // Optionally attach the decoded payload to the request object
    next();
  });
};

export default checkAuth;
