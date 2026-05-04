const ReportService = require("../services/report.service");

class ReportController {
  // TODO: Implement report endpoints with complex SQL queries
  static async getTopUsers(req, res, next) {
    try {
      const limit = parseInt(req.query.limit, 10) || 10;
      const reports = await ReportService.getTopUsers(limit);
      res.status(200).json({
        success: true,
        message: "Top users retrieved successfully",
        payload: reports,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getItemsSold(req, res, next) {
    try {
      const reports = await ReportService.getItemsSold();
      res.status(200).json({
        success: true,
        message: "Items sold report retrieved successfully",
        payload: reports,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getMonthlySales(req, res, next) {
    try {
      const year = parseInt(req.query.year, 10) || new Date().getFullYear();
      const reports = await ReportService.getMonthlySales(year);
      res.status(200).json({
        success: true,
        message: "Monthly sales report retrieved successfully",
        payload: reports,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ReportController;
