const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_, res) => res.json({ ok: true, message: "Universal Toolbox API running" }));

// Note: Tools data is bundled in the frontend (src/data/).
// This backend is ready to extend with a real DB (e.g., SQLite/Postgres).
app.get("/api/tools", (_, res) => res.json({ message: "Tool data is in frontend/src/data/" }));

app.listen(PORT, () => {
  console.log(`\n🧰 Universal Toolbox API → http://localhost:${PORT}\n`);
});
