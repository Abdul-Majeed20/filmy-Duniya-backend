import cors from "cors";
import "dotenv/config";
import express from "express";
import connectDB from "./dbConfig.js";
import movieRoutes from "./routes/movieRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);

app.use("/api/v1", movieRoutes);

app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
