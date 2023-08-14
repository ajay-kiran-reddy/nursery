const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      error: "You must be an authorized user to perform operations..!!",
    });
  }
  const token = authorization.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) {
      let message = "You must be an authorized user to perform operations..!!";
      if (error?.message === "jwt expired") {
        message =
          "Your session is expired. Please login again to perform operations";
      }
      return res.status(401).json({ message, error });
    } else {
      req.user = user;
      next();
    }
  });
};

const isUserAuthenticated = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user._id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({ message: "You do not have permission" });
    }
  });
};

const isAdminAuthenticated = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({ message: "You do not have admin access" });
    }
  });
};

module.exports = { verifyToken, isUserAuthenticated, isAdminAuthenticated };
