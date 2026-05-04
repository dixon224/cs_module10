const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { AppError } = require("../middleware/errorHandler");

const toUserPayload = (user) => ({
  id: user.id,
  name: user.name,
  username: user.username,
  email: user.email,
  phone: user.phone,
  balance: user.balance,
});

class UserService {
  static async register({ name, username, email, phone, password }) {
    // Check if user already exists by email
    const existingUserByEmail = await User.findByEmail(email);
    if (existingUserByEmail) {
      throw new AppError("User with this email already exists", 400);
    }
    // Note: username uniqueness is enforced by database constraint

    // No hashing, store plain text password (insecure)
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      username,
      email,
      phone,
      password: hashedPassword,
    });

    return user;
  }

  static async getUser(email) {
    const user = await User.findByEmail(email);
    if (!user) {
      throw new AppError("Invalid email", 401);
    }

    return {
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        balance: user.balance,
      },
    };
  }

  static async getCurrentUser(userId) {
    if (!userId) {
      throw new AppError("Authenticated user is missing from token", 401);
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    return toUserPayload(user);
  }

  static async login(email, password) {
    const user = await User.findByEmail(email);
    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    // Compare plain text passwords (insecure)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new AppError("Invalid email or password", 401);
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );

    // No JWT, just return user data
    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        balance: user.balance,
      },
    };
  }

  static async auth_login(email, password) {
    const user = await User.findByEmail(email);
    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    // Compare plain text passwords (insecure)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new AppError("Invalid email or password", 401);
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );

    // No JWT, just return user data
    return {
      user: {
        token,
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        balance: user.balance,
      },
    };
  }

  static async updateProfile(id, updateData) {
    const existingUser = await User.findById(id);
    if (!existingUser) {
      throw new AppError("User not found", 404);
    }

    // No password hashing
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }
    const updatedUser = await User.update(id, updateData);
    if (!updatedUser) {
      throw new AppError("User not found", 404);
    }

    await redis.del(`user:${existingUser.email}`);
    return updatedUser;
  }

  static async getTransactionHistory(userId) {
    // Simple query without JOIN (just return raw transactions)
    const transactions = await User.getTransactions(userId);
    return transactions;
  }

  static async getTotalSpent(userId) {
    // Simple total without aggregate
    const transactions = await User.getTransactions(userId);
    const total = transactions.reduce((sum, t) => sum + t.total, 0);
    return total;
  }
}

module.exports = UserService;
