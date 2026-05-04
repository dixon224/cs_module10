const Report = require("../models/report.model");

class ReportService {
  static async getTopUsers(limit) {
    return await Report.getTopUsers(limit);
  }

  static async getItemsSold() {
    return await Report.getItemsSold();
  }

  static async getMonthlySales(year) {
    return await Report.getMonthlySales(year);
  }
}

module.exports = ReportService;
