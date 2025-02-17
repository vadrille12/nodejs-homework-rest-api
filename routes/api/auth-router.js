const express = require("express");

const ctrl = require("../../controllers/auth-controller");

const { validateBody, authenticate } = require("../../decorators");
const { schemas } = require("../../models/user");
const { upload } = require("../../decorators/upload");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.get("/verify/:verificationCode", ctrl.verify);

router.post("/verify", validateBody(schemas.emailSchema), ctrl.resendVerifyEmail);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
