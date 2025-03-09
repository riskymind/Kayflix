import express from "express";
import {
  searchPerson,
  searchMovie,
  searchTv,
  getSearchHistory,
  removeItemFromSearchHistory
} from "../controllers/search.controller.js";

const router = express.Router();

router.get("/person/:query", searchPerson)
router.post("/movie/:query", searchMovie)
router.post("/tv/:query", searchTv)
router.post("/history", getSearchHistory)
router.post("/history/:id", removeItemFromSearchHistory)

export default router;
