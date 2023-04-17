const path = require("path");
const express = require("express");
const cors = require("cors");

const movieRoute = require("./routes/movie");

const app = express();
const PORT = 5500;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/movies", movieRoute);

app.use((req, res, next) => {
  res.status(404).send({ message: "Route not found" });
});

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
