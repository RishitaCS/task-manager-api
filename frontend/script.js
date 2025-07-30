const API_URL = "http://localhost:8080/tasks";

document.getElementById("task-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const dueDate = document.getElementById("dueDate").value;

  const newTask = { title, description, dueDate };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });

    if (!response.ok) throw new Error("Failed to add task");

    document.getElementById("task-form").reset();
    loadTasks();
  } catch (error) {
    console.error(error);
  }
});

async function loadTasks() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch tasks");

    const tasks = await response.json();
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.className = task.completed ? "completed" : "";

      const span = document.createElement("span");
      span.textContent = `${task.title} - ${task.description} (Due: ${task.dueDate})`;

      const completeBtn = document.createElement("button");
      completeBtn.textContent = task.completed ? "✅ Done" : "✔️ Complete";
      completeBtn.onclick = () => toggleComplete(task.id);

      const editBtn = document.createElement("button");
      editBtn.textContent = "✏️ Edit";
      editBtn.onclick = () => editTask(task);

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "🗑️ Delete";
      deleteBtn.onclick = () => deleteTask(task.id);

      const btnGroup = document.createElement("div");
      btnGroup.className = "task-buttons";
      btnGroup.append(completeBtn, editBtn, deleteBtn);

      li.append(span, btnGroup);
      taskList.appendChild(li);
    });
  } catch (error) {
    console.error("Error loading tasks:", error);
  }
}

async function deleteTask(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete task");
    loadTasks();
  } catch (error) {
    console.error(error);
  }
}

async function toggleComplete(id) {
  try {
    const res = await fetch(`${API_URL}/${id}/toggle`, { method: "PUT" });
    if (!res.ok) throw new Error("Failed to complete task");
    loadTasks();
  } catch (error) {
    console.error(error);
  }
}

function editTask(task) {
  const title = prompt("Edit Title:", task.title);
  const description = prompt("Edit Description:", task.description);
  const dueDate = prompt("Edit Due Date (YYYY-MM-DD):", task.dueDate);

  if (title && description && dueDate) {
    updateTask(task.id, { title, description, dueDate });
  }
}

async function updateTask(id, updatedData) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });
    if (!res.ok) throw new Error("Failed to update task");
    loadTasks();
  } catch (error) {
    console.error(error);
  }
}

window.onload = loadTasks;
