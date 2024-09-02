const { User } = require("./../models");
const jwtUtils = require("../utils/jwt"); // Assuming your JWT utility is located here

const authentication = async (req, res, next) => {
  try {
    // Check if the token is provided in the cookies
    const token = req.cookies.authToken;
    if (!token) {
      throw {
        code: 401,
        message: "Token not provided!"
      };
    }

    // Verify the token
    const decode = jwtUtils.verifyToken(token); // Ensure you have this function in your jwtUtils

    // Find the user based on the decoded token
    const userData = await User.findOne({
      where: {
        id: decode.id,
        fullname: decode.fullname
      }
    });

    if (!userData) {
      throw {
        code: 401,
        message: "User not found"
      };
    }

    // Attach user data to the request object
    req.userData = {
      id: userData.id,
      email: userData.email,
    };

    // Proceed to the next middleware or route handler
    next();

  } catch (error) {
    // Send an appropriate response for the error
    res.status(error.code || 500).json({ error: error.message || "Internal Server Error" });
  }
};

module.exports = {
  authentication
};
