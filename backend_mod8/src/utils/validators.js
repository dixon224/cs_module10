const { body, param, query } = require("express-validator");

// TODO: Create regex patterns for the following validations (do not use the patterns provided in completed_backend).
// Email: must be valid (e.g., user@domain.com).
// Password: minimum 10 characters, containing uppercase, lowercase, numbers, and special characters.
// Username: may only contain letters, numbers, and underscores (3-20 characters).
// Phone: international format (optional, may start with +, followed by digits, spaces, or dashes).
// Description: optional, free text but limit length (e.g., max 500 characters).

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_\-\\/[\]`~+=;']).{10,}$/;
const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
const phoneRegex = /^\+?[0-9\s-]+$/;

// Validation rules
const userRegistrationValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 100 })
    .withMessage("Name must be at most 100 characters"),
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3, max: 20 })
    .withMessage("Username must be between 3 and 20 characters")
    .matches(usernameRegex)
    .withMessage("Username may only contain letters, numbers, and underscores"),

  // TODO: add regex validation for username (only letters, numbers, underscores)
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .matches(emailRegex)
    .withMessage("Email must be valid"),
  // TODO: add regex validation for email
  body("phone")
    .optional()
    .trim()
    .matches(phoneRegex)
    .withMessage("Phone must be in international format"),
  // TODO: add regex validation for phone (international format)
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .matches(passwordRegex)
    .withMessage(
      "Password must be at least 10 characters and include uppercase, lowercase, number, and special character",
    ),
  // TODO: add regex validation for password
];

const userUpdateValidation = [
  body("id").isInt().withMessage("User ID must be an integer"),
  body("name")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Name must be at most 100 characters"),
  body("username")
    .optional()
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage("Username must be between 3 and 20 characters")
    .matches(usernameRegex)
    .withMessage("Username may only contain letters, numbers, and underscores"),
  // TODO: regex validation for username
  body("email")
    .optional()
    .trim()
    .matches(emailRegex)
    .withMessage("Email must be valid"),
  // TODO: regex validation for email
  body("phone")
    .optional()
    .trim()
    .matches(phoneRegex)
    .withMessage("Phone must be in international format"),
  // TODO: regex validation for phone
  body("password")
    .optional()
    .trim()
    .matches(passwordRegex)
    .withMessage(
      "Password must be at least 10 characters and include uppercase, lowercase, number, and special character",
    ),
  // TODO: regex validation for password
  body("balance")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Balance must be a non-negative integer"),
];

const transactionCreationValidation = [
  body("user_id").isInt().withMessage("User ID must be an integer"),
  body("item_id").isInt().withMessage("Item ID must be an integer"),
  body("quantity")
    .isInt({ min: 1 })
    .withMessage("Quantity must be a positive integer"),
  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description must be at most 500 characters"),
];

const transactionIdValidation = [
  param("id").isInt().withMessage("Transaction ID must be an integer"),
];

const validate = (req, res, next) => {
  const errors = require("express-validator").validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors.array().map((err) => err.msg);
    return res.status(400).json({
      success: false,
      message: messages.join(". "),
      payload: null,
    });
  }
  next();
};

module.exports = {
  // emailRegex, passwordRegex, phoneRegex removed
  userRegistrationValidation,
  userUpdateValidation,
  transactionCreationValidation,
  transactionIdValidation,
  validate,
};
