import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { TasksCollection } from "../db/TasksCollection";

Meteor.methods({
  // Insert Task API
  "tasks.insert"(text) {
    // Check that the task text is a string
    check(text, String);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    TasksCollection.insert({
      text,
      createdAt: new Date(),
      userId: this.userId,
    });
  },

  // Remove Task API
  "tasks.remove"(taskId) {
    // Check that the taskid is a string
    check(taskId, String);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });

    // Check if user has access to the task
    if (!task) {
      throw new Meteor.Error("Access denied.");
    }

    TasksCollection.remove(taskId);
  },

  // Update Status API
  "tasks.setIsChecked"(taskId, isChecked) {
    // Check that the taskid is a string and the new status is a boolean
    check(taskId, String);
    check(isChecked, Boolean);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });

    // Check if user has access to the task
    if (!task) {
      throw new Meteor.Error("Access denied.");
    }

    TasksCollection.update(taskId, {
      $set: {
        isChecked,
      },
    });
  },
});
