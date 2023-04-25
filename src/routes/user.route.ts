import {  getUserById, getUsers } from "../controllers/user.controller";
import express from "express";
const router = express.Router();

router.route("/").get(getUsers);
router.route("/:id").get(getUserById);

export default router;
