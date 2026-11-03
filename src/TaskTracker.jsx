import { useState } from "react";

function TaskTracker({ onBack, tasks, setTasks }) {
  const [task, setTask] = useState("");
  const [filter, setFilter] = useState("all");
  const remainingTasks = tasks.filter((item) => !item.completed).length;
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter((item) => item.completed).length;
  const completionPercentage =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
  const filteredTasks = tasks.filter((item) => {
    if (filter === "active") return !item.completed;
    if (filter === "completed") return item.completed;
    return true;
  });

  let emptyMessage = "";

  if (filter === "all") {
    emptyMessage = "No tasks yet. Add your first task!";
  } else if (filter === "active") {
    emptyMessage = "No active tasks. Everything is done!";
  } else if (filter === "completed") {
    emptyMessage = "No completed tasks yet.";
  }

  function toggleTask(id) {
    setTasks((previousTasks) =>
      previousTasks.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    );
  }

  function deleteTask(id) {
    setTasks((previousTasks) => previousTasks.filter((item) => item.id !== id));
  }

  function clearCompletedTasks() {
    setTasks((previousTasks) =>
      previousTasks.filter((item) => !item.completed),
    );
  }

  function addTask() {
    if (task.trim() === "") return;

    setTasks((previousTasks) => [
      ...previousTasks,
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
      <button onClick={onBack}>Back to Projects</button>
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
        {totalTasks} {totalTasks === 1 ? "task" : "tasks"} · {remainingTasks}{" "}
        {remainingTasks === 1 ? "task" : "tasks"} remaining
      </p>

      <div className="progress-section">
        <p aria-live="polite">{completionPercentage}% completed</p>

        <div
          className="progress-bar"
          role="progressbar"
          aria-valuenow={completionPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Task completion progress"
        >
          <div
            className="progress-bar-fill"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>

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
      {completedTasks > 0 && (
        <button onClick={clearCompletedTasks}>Clear completed tasks</button>
      )}

      {filteredTasks.length > 0 ? (
        <ul>
          {filteredTasks.map((item) => (
            <li key={item.id}>
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleTask(item.id)}
                aria-label={item.text}
              />
              <span
                style={{
                  textDecoration: item.completed ? "line-through" : "none",
                }}
              >
                {item.text}
              </span>

              <button
                onClick={() => deleteTask(item.id)}
                aria-label={`Delete ${item.text}`}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>{emptyMessage}</p>
      )}
    </section>
  );
}

export default TaskTracker;
