import jwt from "jsonwebtoken";

const secret = process.env.SECRET;

export function verifyToken(req, res, next) {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(401).json({ auth: false, message: "no token provided" });
  }

  const decoded = jwt.verify(token, secret);

  console.log(decoded);
  next();
}
