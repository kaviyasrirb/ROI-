import express from "express";
const router = express.Router();

router.post("/simulate", (req, res) => {
  const {
    monthly_invoice_volume,
    num_ap_staff,
    avg_hours_per_invoice,
    hourly_wage,
    error_rate_manual,
    error_cost,
    time_horizon_months,
    one_time_implementation_cost,
  } = req.body;

  // Parse inputs as numbers (they come as strings)
  const miv = Number(monthly_invoice_volume);
  const staff = Number(num_ap_staff);
  const avgHours = Number(avg_hours_per_invoice);
  const wage = Number(hourly_wage);
  const errorRate = Number(error_rate_manual);
  const errorCost = Number(error_cost);
  const timeHorizon = Number(time_horizon_months);
  const oneTimeCost = Number(one_time_implementation_cost);

  // Calculate monthly savings from reducing error costs
  const monthlySavings = miv * avgHours * wage * (errorRate / 100);
  // Calculate payback months from one-time implementation cost
  const paybackMonths = monthlySavings ? oneTimeCost / monthlySavings : 0;
  // Calculate ROI over time horizon months
  const roiPercentage = oneTimeCost
    ? ((monthlySavings * timeHorizon - oneTimeCost) / oneTimeCost) * 100
    : 0;

  res.json({
    monthly_savings: monthlySavings || 0,
    payback_months: paybackMonths || 0,
    roi_percentage: roiPercentage || 0,
  });
});

export default router;
