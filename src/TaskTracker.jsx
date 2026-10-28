import { useState } from "react";

function TaskTracker() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const remainingTasks = tasks.filter((item) => !item.completed).length;
  const totalTasks = tasks.length;

  const filteredTasks = tasks.filter((item) => {
    if (filter === "active") return !item.completed;
    if (filter === "completed") return item.completed;
    return true;
  });

  function toggleTask(id) {
    setTasks(
      tasks.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    );
  }

  function deleteTask(id) {
    setTasks(tasks.filter((item) => item.id !== id));
  }

  function addTask() {
    if (task.trim() === "") return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: task.trim(),
        completed: false,
      },
    ]);

    setTask("");
  }

  return (
    <section>
      <h2>Interactive Task Tracker</h2>

      <button
        onClick={() => setFilter("all")}
        aria-pressed={filter === "all"}
        className={
          filter === "all" ? "filter-button selected" : "filter-button"
        }
      >
        All
      </button>

      <button
        onClick={() => setFilter("active")}
        aria-pressed={filter === "active"}
        className={
          filter === "active" ? "filter-button selected" : "filter-button"
        }
      >
        Active
      </button>

      <button
        onClick={() => setFilter("completed")}
        aria-pressed={filter === "completed"}
        className={
          filter === "completed" ? "filter-button selected" : "filter-button"
        }
      >
        Completed
      </button>

      <p>
        <p>
          {totalTasks} {totalTasks === 1 ? "task" : "tasks"} · {remainingTasks}{" "}
          {remainingTasks === 1 ? "task" : "tasks"} remaining
        </p>
      </p>

      <input
        type="text"
        placeholder="Enter a task..."
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            addTask();
          }
        }}
        value={task}
        onChange={(event) => setTask(event.target.value)}
      />

      <button onClick={addTask}>Add task</button>
      <ul>
        {filteredTasks.map((item) => (
          <li key={item.id}>
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => toggleTask(item.id)}
            />
            <span
              style={{
                textDecoration: item.completed ? "line-through" : "none",
              }}
            >
              {item.text}
            </span>

            <button onClick={() => deleteTask(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default TaskTracker;
