import { Router } from "express";

import {
  registerUser,
  loginUser,
  updateUserAvatar,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  updateAccountDetails,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { isAdmin, verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/signup").post(registerUser);
router.route("/signin").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/update-account").patch(verifyJWT, updateAccountDetails);
router
  .route("/uploadProfile")
  .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);

export default router;
