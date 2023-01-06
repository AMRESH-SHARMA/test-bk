import { Router } from "express";
const router = Router();
import {
  registerUser,
  loginUser,
  logout,
  // forgotPassword,
  // resetPassword,
  // getUserDetails,
  // updatePassword,
  updateProfile,
  // getSingleUser,
  // getAllUser
} from "./userController.js"
import { isAuthenticatedUser } from "../../util/auth.js"
import { vAccessToken, vLogin } from "../../util/validators.js"

router.route("/user/register").post(vLogin, registerUser);

router.route("/user/login").post(vLogin, loginUser);

// router.route("/user/forgot-password").post(forgotPassword);

// router.route("/user/password/reset/:token").put(resetPassword);

router.route("/user/logout").delete(logout);

// router.route("/user/details").get(isAuthenticatedUser, getUserDetails);
// router
//     .route("/admin/users")
//     .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUser);
// router
//     .route("/admin/user/:id")
//     .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)



// router.route("/user/password/update").put(isAuthenticatedUser, updatePassword);

router.route("/user/update-profile").put(vAccessToken, isAuthenticatedUser, updateProfile);


export default router;