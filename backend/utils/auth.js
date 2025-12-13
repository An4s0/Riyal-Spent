const jwt = require("jsonwebtoken");

function getUserFromToken(req) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer "))
    throw new Error("UNAUTHORIZED");

  const token = header.split(" ")[1];
  return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = { getUserFromToken };
