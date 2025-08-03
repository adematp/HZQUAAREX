const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", async (req, res) => {
  try {
    const { card } = req.body;

    if (!card) {
      return res.status(400).json({ error: "Kart bilgisi eksik" });
    }

    const [cc, month, year, cvv] = card.split("|");

    const response = await axios.get(
      `https://checkout-gw.prod.ticimax.net/payments/9/card-point?cc=${cc}&month=${month}&year=${year}&cvv=${cvv}&lid=45542`
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "API isteği başarısız", detail: error.message });
  }
});

module.exports = router;
