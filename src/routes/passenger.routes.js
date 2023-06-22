import { Router } from "express";
import { getTravels } from "../controllers/travels.controller.js";

export const passengerrouter = Router();

passengerrouter.get("/passengers/travels", getTravels);

