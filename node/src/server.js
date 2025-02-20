const app = require("./app");
const { connectDB } = require("./config/db");

const PORT = process.env.PORT || 5001;

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
