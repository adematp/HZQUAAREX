const express = require("express");
const cors = require("cors");
const app = express();
const puanRoute = require("./puan");

app.use(cors());
app.use(express.json());

// Route bağlama
app.use("/api/puan", puanRoute);

// Ana sayfa
app.get("/", (req, res) => {
  res.send("API çalışıyor");
});

// Sunucuyu başlat
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Sunucu çalışıyor: ${PORT}`);
});
