const UserService = require("../services/user.service");
const redis = require("../database/redis");
class UserController {
  static async register(req, res, next) {
    try {
      const { name, username, email, phone, password } = req.body;
      const user = await UserService.register({
        name,
        username,
        email,
        phone,
        password,
      });
      res.status(201).json({
        success: true,
        message: "User registered successfully",
        payload: user,
      });
    } catch (error) {
      next(error);
    }
  }

  static async me(req, res, next) {
    try {
      const user = await UserService.getCurrentUser(req.user?.userId);

      return res.status(200).json({
        success: true,
        message: "User retrieved successfully",
        payload: user,
      });
    } catch (error) {
      next(error);
    }
  }

  static async logout(req, res, next) {
    try {
      return res.status(200).json({
        success: true,
        message: "Logout successful",
      });
    } catch (error) {
      next(error);
    }
  }

  static async gett(req, res, next) {
    try {
      const { email } = req.params;

      if (email === "me") {
        return UserController.me(req, res, next);
      }

      const redKey = `user:${email}`;

      const redRes = await redis.get(redKey);

      if (redRes) {
        return res.status(200).json({
          success: true,
          message: "User retrieved from cache",
          payload: JSON.parse(redRes),
        });
      }

      const user = await UserService.getUser(email);

      await redis.set(redKey, JSON.stringify(user), "EX", 60);

      return res.status(200).json({
        success: true,
        message: "User retrieved from database",
        payload: user,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await UserService.login(email, password);
      res.status(200).json({
        success: true,
        message: "Login successful",
        payload: result.user,
      });
    } catch (error) {
      next(error);
    }
  }

  static async auth_login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await UserService.auth_login(email, password);
      res.status(200).json({
        success: true,
        message: "Login successful",
        payload: result.user,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateProfile(req, res, next) {
    try {
      const { id, name, username, email, phone, password, balance } = req.body;
      const updatedUser = await UserService.updateProfile(id, {
        name,
        username,
        email,
        phone,
        password,
        balance,
      });
      res.status(200).json({
        success: true,
        message: "User updated successfully",
        payload: updatedUser,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getTransactionHistory(req, res, next) {
    try {
      // For simplicity, use user_id from query param (insecure)
      const userId = req.query.user_id || 1;
      const history = await UserService.getTransactionHistory(userId);
      res.status(200).json({
        success: true,
        message: "Transaction history retrieved",
        payload: history,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getTotalSpent(req, res, next) {
    try {
      const userId = req.query.user_id || 1;
      const totalSpent = await UserService.getTotalSpent(userId);
      res.status(200).json({
        success: true,
        message: "Total spent retrieved",
        payload: { total_spent: totalSpent },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
