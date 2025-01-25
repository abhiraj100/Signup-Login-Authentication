import jwt from "jsonwebtoken";

const ensureAuthenticated = (req, res, next) => {
  const auth = req.headers["authorization"];
  if (!auth) {
    return res.status(403).json({
      success: false,
      message: "Unauthorized, JWT Token is required!",
    });
  }

  try {
    const decode = jwt.verify(auth, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized, JWT Token is wrong or expired",
    });
  }
};

export {
    ensureAuthenticated
}
