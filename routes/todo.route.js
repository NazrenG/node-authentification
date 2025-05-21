import express from "express";
import { getTodoById,getTodos,createTodo,updateTodo,deleteTodo } from "../controllers/todo.controller.js";

const router = express.Router();
router.get("/", getTodos);
router.post("/add", createTodo);   
router.get("/:id", getTodoById);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;