import React, { useState } from "react";
import "./TaskCardView.css";
import rootStore from "../../dataStore/RootStore";
import { observer } from "mobx-react";

function TaskCardView({ open, onCloseModal, taskData }) {
  const [task, setTask] = useState(taskData);
  const { taskDataStore } = rootStore;

  const addSubTaskField = () => {
    setTask({
      ...task,
      subTasks: [
        ...task.subTasks,
        { st_id: task.subTasks.length+1, st_name: "" ,st_status:'todo'},
      ],
    });
  };

  const handleContainerClick = (e) => {
    e.stopPropagation();
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
            />
            <button onClick={addSubTaskField} className="AddSbt-btn" title="Add Sub Task">+</button>
            <div className="subTaskDetails">
              {task.subTasks.map((sbt, index) => (
                <input
                  key={index}
                  value={sbt.st_name}
                  onChange={(e) => {
                    const updatedSubTasks = [...task.subTasks];
                    updatedSubTasks[index].st_name = e.target.value;
                    setTask({ ...task, subTasks: updatedSubTasks });
                  }}
                  placeholder="Sub-task Name"
                />
              ))}
            </div>
            <div className="button-container">
              <button
                className="save-btn"
                onClick={()=>{taskDataStore.editTaskDetails(task);onCloseModal()}}
              >
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

export default observer(TaskCardView);
