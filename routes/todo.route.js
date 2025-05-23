import express from "express";
import { getTodoById,getTodos,createTodo,updateTodo,deleteTodo } from "../controllers/todo.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";
import { checkAdmin } from "../middleware/checkAdmin.js";

const router = express.Router();
router.get("/", getTodos);
router.post("/add", createTodo);   
router.get("/:id", getTodoById);
router.put("/:id", updateTodo);
router.delete("/:id",protectRoute,checkAdmin, deleteTodo);

export default router;