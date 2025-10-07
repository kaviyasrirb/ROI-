// server.js
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/roi/simulate", (req, res) => {
  console.log("Received data:", req.body);
  res.json({
    monthly_savings: 1000,
    payback_months: 5,
    roi_percentage: 200,
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
