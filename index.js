const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// JSON veri alabilmek için
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// index.html ve diğer dosyaları sun
app.use(express.static(path.join(__dirname)));

// Ana sayfa: index.html'i göster
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Puan API yönlendirme (puan.js dosyasını çağırır)
const puanRoute = require("./api/puan");
app.use("/api/puan", puanRoute);

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});
