import { observer } from "mobx-react";
import React, { useState } from "react";
import rootStore from "../../dataStore/RootStore";
import "./AddTask.css";

function AddTask({ open, onCloseModal }) {
  const { taskDataStore } = rootStore;
  const uniqueId=taskDataStore.tasks.length+1;
  const [task, setTask] = useState({
    id: uniqueId,
    name: "",
    subTasks: [],
    status: "todo",
  });

  console.log(taskDataStore.tasks.length)

  const handleContainerClick = (e) => {
    e.stopPropagation();
  };

  const addSubTaskField = () => {
    setTask({
      ...task,
      subTasks: [
        ...task.subTasks,
        { st_id: task.subTasks.length, st_name: "", st_status: "todo" },
      ],
    });
  };

  const validate = () => {
    task.subTasks=task.subTasks.filter((item) => item.st_name !== "");
    if (task.name !== "") {
      taskDataStore.addTask(task);
      onCloseModal();
      setTask({
        id: taskDataStore.tasks.length,
        name: "",
        subTasks: [],
        status: "todo",
      });
    } else {
      if(task.name===""){
        alert("Please enter the task details");
      }
      else{
        alert("Add atleast one sub task");
      }
    }
  };

  return (
    <div className="Modal">
      {open ? (
        <div className="taskcardview" onClick={onCloseModal}>
          <div className="cardContainer" onClick={handleContainerClick}>
            <input
              className="taskTitle"
              type="text"
              value={task.name}
              onChange={(e) => setTask({ ...task, name: e.target.value })}
              placeholder="Task name"
            />
            <button
              onClick={addSubTaskField}
              className="AddSbt-btn"
              title="Add Sub Task"
            >
              +
            </button>
            <div className="subTaskDetails">
              {task.subTasks.map((sbt, index) => (
                <input
                  value={sbt.st_name}
                  onChange={(e) => {
                    const updatedSubTasks = [...task.subTasks];
                    updatedSubTasks[index].st_name = e.target.value;
                    setTask({ ...task, subTasks: updatedSubTasks });
                  }}
                  placeholder="Sub-task name"
                />
              ))}
            </div>
            <div className="button-container">
              <button className="save-btn" onClick={validate}>
                save
              </button>
              <button className="cancel-btn" onClick={onCloseModal}>
                cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default observer(AddTask);
