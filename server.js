const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/axxess", async (req, res) => {
  try {
    const { card_number, expiry_month, expiry_year, cvv } = req.body;

    const response = await axios.post(
      "https://checkout-gw.prod.ticimax.net/payments/9/card-point",
      {
        card: {
          cardNumber: card_number,
          expireMonth: expiry_month,
          expireYear: expiry_year,
          cvc: cvv,
        },
        domain_name: "magaza.ticimax.com", // ZORUNLU ALAN — eklendi
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      error: "API isteği başarısız oldu",
      details: error.response?.data || error.message,
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
});
