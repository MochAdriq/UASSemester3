import express from "express";
import userController from "../controller/user-controller.js";
import eventController from "../controller/event-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const userRouter = new express.Router();
userRouter.use(authMiddleware);

/// user api
userRouter.get("/api/users/current", userController.get);
userRouter.patch("/api/users/current", userController.update);
userRouter.delete("/api/users/logout", userController.logout);

/// event api
userRouter.post("/api/events", eventController.create);
userRouter.get("/api/events/:eventId", eventController.get);
userRouter.put("/api/events/:eventId", eventController.update);
userRouter.delete("/api/events/:eventId", eventController.remove);
userRouter.get("/api/events", eventController.search);

export { userRouter };
