<script>
  let newTask = "";

  // Method for submitting a new task and calling insert API
  const handleSubmit = () => {
    if (!newTask) return;

    Meteor.call("tasks.insert", newTask);

    // Clear form
    newTask = "";
  };
</script>

<form class="task-form" on:submit|preventDefault={handleSubmit}>
  <input
    type="text"
    name="text"
    placeholder="Type to add new task text"
    bind:value={newTask}
  />
  <button type="submit">Add Task</button>
</form>
