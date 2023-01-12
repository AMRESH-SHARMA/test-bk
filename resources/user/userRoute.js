import { Router } from "express";
const router = Router();
import {
  registerUser,
  loginUser,
  logout,
  // forgotPassword,
  // resetPassword,
  // updatePassword,
  // updateProfile,
  updateUserStatus,
  updateUser,
  getSingleUser,
  getAllUser,
  createUser,
} from "./userController.js"
import { isAuthenticatedUser } from "../../util/auth.js"
import { vAccessToken, vLogin, vCreateUser } from "../../util/validators.js"

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

// router.route("/user/update-profile").put(vAccessToken, isAuthenticatedUser, updateProfile);
router.route("/user/get-users").get(getAllUser);

router.route("/user/create-user").post(createUser);

router.route("/user/get-single-user/:id").get(getSingleUser);

router.route("/user/update-user/:id").put(updateUser);

router.route("/user/update-user-status").put(updateUserStatus);

export default router;