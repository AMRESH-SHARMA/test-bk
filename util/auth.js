import User from "../resources/user/userModel.js";
import jwt from "jsonwebtoken";

export const isAuthenticatedUser = async (req, res, next) => {
  try {
    // const { token } = req.cookies;
    if (!req.headers.authorization) {
      return res.status(400).json({
        success: false,
        message: "Login to Access this resource",
      });
    }
    const getToken = req.headers;
    // console.log(getToken);

    //remove Bearer from token
    const fronttoken = getToken.authorization.slice(7);

    const frontdecoded = jwt.verify(fronttoken, process.env.JWT_SECRET);

    const fuser = await User.findById(frontdecoded.id);

    req.user = fuser;

    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};