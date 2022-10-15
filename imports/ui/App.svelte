<script>
  import { TasksCollection } from "../db/TasksCollection";
  import { Meteor } from "meteor/meteor";
  import Task from "./Task.svelte";
  import TaskForm from "./TaskForm.svelte";
  import LoginForm from "./LoginForm.svelte";

  let hideCompleted = false;

  // Method for updating filter status
  const setHideCompleted = (value) => {
    hideCompleted = value;
  };

  // variables used by the frontend
  let incompleteCount;
  let pendingTasksTitle = "";
  let tasks = [];
  let user = null;
  let isLoading = true;
  const handler = Meteor.subscribe("tasks");

  $m: {
    // Get current user
    user = Meteor.user();

    if (user) {
      // Set loading variable while waiting for handler
      isLoading = !handler.ready();

      // Create filters based on user id (if exists) and if task completed
      const pendingOnlyFilter = {
        isChecked: { $ne: hideCompleted },
        userId: user._id,
      };

      // Select tasks based on user id
      tasks = TasksCollection.find(pendingOnlyFilter, {
        sort: { createdAt: -1 },
      }).fetch();

      // Count the number of tasks and display if greater than 0
      incompleteCount = user ? tasks.length : 0;
      pendingTasksTitle = incompleteCount ? ` (${incompleteCount})` : "";
    }
  }

  const logout = () => Meteor.logout();
</script>

<div class="app">
  <header>
    <div class="app-bar">
      <div class="app-header">
        <h1>📝️ To Do List {pendingTasksTitle}</h1>
      </div>
    </div>
  </header>

  <div class="main">
    {#if user}
      <div class="user" on:click={logout} on:keypress={logout}>
        {user.username} 🚪
      </div>

      <TaskForm />

      <div class="filter">
        <button on:click={() => setHideCompleted(!hideCompleted)}>
          {hideCompleted ? "Show All" : "Hide Completed"}
        </button>
      </div>

      {#if isLoading}
        <div class="loading">loading...</div>
      {/if}

      <ul class="tasks">
        {#each tasks as task (task._id)}
          <Task {task} />
        {/each}
      </ul>
    {:else}
      <LoginForm />
    {/if}
  </div>
</div>
