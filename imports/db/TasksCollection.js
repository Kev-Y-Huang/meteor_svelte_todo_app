import { Mongo } from "meteor/mongo";

// Create a Mongo collection for tasks
export const TasksCollection = new Mongo.Collection("tasks");
