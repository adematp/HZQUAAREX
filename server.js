const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.post("/api/axxess", async (req, res) => {
  const { cc, month, year, cvv } = req.body;

  const url = "https://checkout-gw.prod.ticimax.net/payments/9/card-point";
  const data = {
    CardNumber: cc,
    ExpireMonth: month,
    ExpireYear: year,
    CvcNumber: cvv,
    domain_name: "ticimax.com" // ← Buraya gerçek domain girilebilir
  };

  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      error: "API isteği başarısız oldu",
      details: error.response ? error.response.data : error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server çalışıyor: http://localhost:${PORT}`);
});
