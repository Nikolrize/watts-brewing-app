require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db"); // 👈 add this

connectDB();

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});