import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import '/imports/api/tasksMethods';
import '/imports/api/tasksPublications';

const SEED_USERNAME = "meteorite";
const SEED_PASSWORD = "password";

Meteor.startup(() => {
  // Create account with seed username and seedpassword if doesn't exist
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }
});
