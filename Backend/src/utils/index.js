import jwt from "jsonwebtoken";

const generateAccessToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};

export { generateAccessToken };

// generateKeyPair();
