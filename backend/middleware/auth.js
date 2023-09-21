const ErrorHandler = require("./errorhandler");
const catchAsyncErrors = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  // Trying to het token from request
  const { token } = req.cookies;

  // If token deosnot exists it means user is not logged in
  if (!token) {
    return next(new ErrorHandler("Please Login to access this resource", 401));
  }


  // Verify Token - it will return decoded token which will have user details(id)
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  // Storing user data in req.user object to further have acces to it in controllers
  req.user = await User.findOne({ _id: decodedData.id });

  next();
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    // Checks if the current passed role is same as user's role - if not return error
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resouce `,
          403
        )
      );
    }

    next();
  };
};
