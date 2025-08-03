const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

app.post("/axess-check", async (req, res) => {
  const { cc, month, year, cvv } = req.body;

  const lid = "45542"; // Turna.com sorgusundaki lid

  try {
    const response = await axios.get(
      `https://checkout-gw.prod.ticimax.net/payments/9/card-point`,
      {
        params: { cc, month, year, cvv, lid },
        headers: {
          "Origin": "https://www.turna.com",
          "Referer": "https://www.turna.com/",
          "User-Agent": "Mozilla/5.0",
        },
      }
    );

    res.json({ success: true, data: response.data });
  } catch (error) {
    res.json({
      success: false,
      message: "Sorgulama başarısız",
      error: error.message,
    });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Axess proxy çalışıyor");
});
