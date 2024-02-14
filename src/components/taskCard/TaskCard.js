import React, { useState } from "react";
import "./TaskCard.css";
import TaskCardView from "../taskCardView/TaskCardView";
import rootStore from "../../dataStore/RootStore";
import { observer } from "mobx-react";

function TaskCard({ task }) {
  const { taskDataStore } = rootStore;

  const [showModal, setShowModal] = useState(false);

  const card_color =
    task.status === "todo"
      ? "rgba(224, 233, 255, 1)"
      : task.status === "inprogress"
      ? "rgba(255, 246, 240, 1)"
      : task.status === "done"
      ? "rgba(207, 255, 185, 1)"
      : "";

  // const updateTaskStatus = (task_id) => {
  //   let tasks = JSON.parse(localStorage.getItem("tasks_data"));
  //   const taskIndex = tasks.findIndex((task) => task.id === task_id);
  //   if (taskIndex === -1) return; // Task not found

  //   const taskToUpdate = tasks[taskIndex];

  //   // Check if all subtasks are 'done'
  //   const allDone = taskToUpdate.subTasks.every(
  //     (subTask) => subTask.st_status === "done"
  //   );

  //   // Check if at least one subtask is 'done'
  //   const atLeastOneDone = taskToUpdate.subTasks.some(
  //     (subTask) => subTask.st_status === "done"
  //   );

  //   // Update task status based on subtask statuses
  //   if (allDone) {
  //     tasks[taskIndex].status = "done";
  //   } else if (atLeastOneDone) {
  //     tasks[taskIndex].status = "inprogress";
  //   }

  //   // Update tasks_data in localStorage
  //   localStorage.setItem("tasks_data", JSON.stringify(tasks));
  // };

  // const changeStatus = (task_id, subTask_id) => {
  //   const tasks = JSON.parse(localStorage.getItem("tasks_data"));
  //   console.log(task_id, subTask_id);
  //   tasks.forEach((task) => {
  //     task.id === task_id &&
  //       task.subTasks.forEach((subTask) => {
  //         if (subTask.St_id === subTask_id) {
  //           // Update the status of the subtask
  //           subTask.st_status = "done";
  //         } else {
  //           subTask.st_status === "todo" && (subTask.st_status = "inprogress");
  //         }
  //       });
  //   });
  //   localStorage.setItem("tasks_data", JSON.stringify(tasks));
  //   updateTaskStatus(task_id);
  // };


  return (
    <div className="task-card" style={{ background: card_color }}>
      <div className="sub-header">
        <p className="taskTitle" onClick={() => setShowModal(!showModal)}>
          {task.name}
        </p>
        <button className="delete" onClick={() => taskDataStore.deleteTask(task.id)}></button>
      </div>
      <div className="sub-task-details">
        {task.subTasks.map((st) => {
          return task.status !== "todo" ? (
            <label
              style={{
                textDecoration: st.st_status === "done" && "line-through",
                textIndent: "-20px",
                marginLeft: "20px",
              }}
            >
              <input
                type="checkbox"
                checked={st.st_status === "done"}
                onChange={(e) => {
                  const updatedStatus = e.target.checked ? 'done' : 'todo'; // Determine the new status based on checkbox state
                  taskDataStore.updateSubTaskStatus(task.id, st.St_id, updatedStatus); // Update subtask status
              }}
              />
              {st.st_name}
            </label>
          ) : (
            <li style={{ textIndent: "-20px", marginLeft: "20px" }}>
              {st.st_name}
            </li>
          );
        })}
      </div>
      <div className="status-container">
        <p>Move To :</p>
        <select
          className="status"
          value={task.status}
          onChange={(e) =>
            taskDataStore.updateTaskStatus(task.id, e.target.value)
          }
        >
          <option value="todo">ToDo</option>

          <option value="inprogress">Inprogress</option>

          <option value="done">Done</option>
        </select>
      </div>
      <TaskCardView
        open={showModal}
        onCloseModal={() => setShowModal(false)}
        taskData={task}
      />
    </div>
  );
}

export default observer(TaskCard);
