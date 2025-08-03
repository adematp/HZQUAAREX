import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/", async (req, res) => {
  const kart = req.query.card;
  if (!kart) {
    return res.status(400).json({ error: "Kart numarası eksik" });
  }

  try {
    const response = await axios.get(`https://solwinsystemm.rf.gd/api.php?card=${kart}`);
    const puan = response?.data?.data?.point ?? 0;
    const status = puan > 0 ? "LIVE" : "DEAD";

    res.json({
      status,
      puan,
      etiket: "@HzQuarex"
    });
  } catch (err) {
    res.status(500).json({ error: "Sunucu hatası", detay: err.message });
  }
});

export default router;
