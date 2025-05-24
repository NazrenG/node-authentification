import express from "express";
import { getTodoById,getTodos,createTodo,updateTodo,deleteTodo,getUserTodos } from "../controllers/todo.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";
import { checkAdmin } from "../middleware/checkAdmin.js";

const router = express.Router();
router.get("/", getTodos);
router.get("/user", protectRoute, getUserTodos); 
router.post("/add",protectRoute, createTodo);   
router.get("/:id", getTodoById);
router.put("/:id",protectRoute, updateTodo);
router.delete("/:id",protectRoute,checkAdmin, deleteTodo);

export default router;