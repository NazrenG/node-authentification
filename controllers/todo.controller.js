import Todo from "../models/todo.model.js";
import { getTokenContents } from "../utils/getTokenContent.js";

// Create a new todo
export const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const {accessToken}= req.cookies;
    const {id}=getTokenContents(res, accessToken); 
    const newTodo = new Todo({ title, description, user: id });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: "Error creating todo", error });
  }
};
//get all todos for a user
export const getUserTodos = async (req, res) => {
  try {
    const user = req.user._id;
    const todos = await Todo.find({ user }).populate(
      "user",
      "firstName lastName email"
    );
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: "Error fetching todos for user", error });
  }
};
// Get all todos
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    console.log("adgadcgacgdeeee")
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: "Error fetching todos", error });
  }
};
// Get a single todo by ID
export const getTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Error fetching todo", error });
  }
};
// Update a todo by ID
export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: "Error updating todo", error });
  }
};
// Delete a todo by ID
export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting todo", error });
  }
};
