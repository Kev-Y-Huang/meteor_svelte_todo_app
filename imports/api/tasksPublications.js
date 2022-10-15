import { Meteor } from "meteor/meteor";
import { TasksCollection } from "/imports/db/TasksCollection";

// Allows the data to be published from the server to the client
Meteor.publish("tasks", function publishTasks() {
  return TasksCollection.find({ userId: this.userId });
});
