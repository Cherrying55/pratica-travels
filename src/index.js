import express from "express";
import httpStatus from "http-status";
import { passengerrouter } from "./routes/passenger.routes.js";

const app = express();
const port = process.env.PORT || 5000;

app.get("/health", (req, res) => res.sendStatus(httpStatus.OK));

app.listen(port, () => {
  console.log(`Server is up and running or port: ${port}`);
})

app.use(passengerrouter);