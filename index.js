import express from "express";
import puanApi from "./api/puan.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use("/api/puan", puanApi);

app.get("/", (req, res) => {
  res.send("Maxipuan API çalışıyor - @HzQuarex");
});

app.listen(PORT, () => {
  console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});
