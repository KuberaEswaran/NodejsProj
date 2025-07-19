const axios = require("axios");
const getSandboxToken = require("./getSandboxToken");

const fetchOnlineTax = async (grossMonthlyIncome) => {
  try {
    const token = await getSandboxToken();
    if (!token) throw new Error("Token missing");

    const res = await axios.post(
      "https://sandbox.co.in/it/calculator/tds/income",
      {
        financialYear: "2024-25",
        grossIncome: grossMonthlyIncome * 12,
        regime: "new",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": process.env.x - api - key,
          "x-api-version": process.env.x - api - version,
          "Content-Type": "application/json",
        },
      }
    );

    return Math.round(res.data?.monthlyTax || 0);
  } catch (err) {
    console.error("TDS fetch failed:", err.message);
    return 0;
  }
};

module.exports = fetchOnlineTax;
