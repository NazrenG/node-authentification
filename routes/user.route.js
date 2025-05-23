import express from 'express';
import {createUser, getCurrentUser,getUserById,getUsers,deleteUser,updateUser } from '../controllers/user.controller.js';

import { protectRoute } from '../middleware/protectRoute.js';
import { checkAdmin } from '../middleware/checkAdmin.js';

const router = express.Router();
//get all users
router.get("/", getUsers);
//get current user
router.get("/current", protectRoute,checkAdmin, getCurrentUser);
//get user by id
router.get("/:id", protectRoute, getUserById);
//update user by id
router.put("/:id", protectRoute, updateUser);
//delete user by id
router.delete("/:id", protectRoute, checkAdmin, deleteUser);
//create user
router.post("/", createUser);

export default router;