import React, { useState } from "react";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    monthly_invoice_volume: "",
    num_ap_staff: "",
    avg_hours_per_invoice: "",
    hourly_wage: "",
    error_rate_manual: "",
    error_cost: "",
    time_horizon_months: "",
    one_time_implementation_cost: "",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make sure this URL matches your backend
      const res = await axios.post("http://localhost:5000/api/roi/simulate", formData);
      console.log("Response from backend:", res.data);
      setResult(res.data);
    } catch (error) {
      console.error("Error:", error);
      alert("Backend connection failed!");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "20px auto", fontFamily: "Arial, sans-serif" }}>
      <h1>💰 Invoicing ROI Simulator</h1>

      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div key={key} style={{ marginBottom: 12 }}>
            <label style={{ display: "block", fontWeight: "bold", marginBottom: 4 }}>
              {key.replaceAll("_", " ").toUpperCase()}
            </label>
            <input
              type="number"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              placeholder="Enter value"
              required
              style={{ width: "100%", padding: 8, fontSize: 14 }}
            />
          </div>
        ))}

        <button type="submit" style={{ padding: "10px 15px", fontSize: 16, cursor: "pointer" }}>
          🚀 Simulate ROI
        </button>
      </form>

      {result && (
        <div style={{ marginTop: 30, padding: 20, border: "1px solid #ccc", borderRadius: 8 }}>
          <h2>📊 Results</h2>
          <pre style={{ background: "#f9f9f9", padding: 10, borderRadius: 4 }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default App;
