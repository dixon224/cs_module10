const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const { authenticateToken } = require("../middleware/authMiddleware");
const {
  userRegistrationValidation,
  userUpdateValidation,
  validate,
} = require("../utils/validators");

//console.log("userRegistrationValidation:", userRegistrationValidation);
// console.log("validate:", validate);
// console.log("UserController.register:", UserController.register);
// Public routes
router.post(
  "/register",
  userRegistrationValidation,
  validate,
  UserController.register,
);
router.post("/login", UserController.login);
router.post("/auth/login", UserController.auth_login);

// Protected routes (no JWT, just placeholder)
router.put(
  "/update",
  authenticateToken,
  userUpdateValidation,
  validate,
  UserController.updateProfile,
);

router.get("/:email", authenticateToken, UserController.gett);
router.get("/me", authenticateToken, UserController.me);
router.post("/logout", UserController.logout);
router.get("/history", UserController.getTransactionHistory);
router.get("/total-spent", UserController.getTotalSpent);

module.exports = router;
