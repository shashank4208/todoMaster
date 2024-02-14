import React, { useEffect, useState } from "react";
import "./Home.css";
import TaskCard from "../taskCard/TaskCard";
import { observer } from "mobx-react";
import rootStore from "../../dataStore/RootStore";
import { useNavigate } from "react-router-dom";
import AddTask from "../addTask/AddTask";
import axios from "axios";

function Home() {
  const { taskDataStore, ProfilStore } = rootStore;
  const [showModal, setShowModal] = useState(false);

  const tasks = taskDataStore.tasks;
  useEffect(() => {
    if (ProfilStore.refresh_token) {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      ProfilStore.profileData = userInfo.userData;
      taskDataStore.tasks = userInfo.taskData;
      try {
        axios
          .post("https://api.escuelajs.co/api/v1/auth/refresh-token", {
            refreshToken: ProfilStore.refresh_token,
          })
          .then((response) => {
            const { access_token, refresh_token } = response.data;
            localStorage.setItem("access_token", access_token);
            localStorage.setItem("refresh_token", refresh_token);
          });
      } catch (error) {
        alert(error);
      }
    }
  }, []);

  const navigate = useNavigate();

  const profilePage = () => {
    navigate("/profile");
  };

  const toDo_tasks = tasks.filter((task) => {
    return (
      task.subTasks.every((sbt) => sbt.st_status === "todo") &&
      task.status === "todo"
    );
  });

  const inprogress_tasks = tasks.filter((task) => {
    return task.status === "inprogress";
  });

  const completed_tasks = tasks.filter((task) => {
    return (
      task.subTasks.every((sbt) => sbt.st_status === "done") &&
      task.status === "done"
    );
  });

  return (
    <div className="home-page">
      <div className="header">
        <div className="logo-container">
          <p className="logo">ToDoMaster</p>
        </div>
        <div className="right-header">
          <button
            className="addTask-btn"
            onClick={() => setShowModal(!showModal)}
          >
            Add new task
          </button>
          <button
            className="profile-icon"
            onClick={profilePage}
            style={{
              backgroundImage: `${
                ProfilStore.profileData === null
                  ? "var(--grey)"
                  : `url(${ProfilStore.profileData.avatar})`
              }`,
            }}
          ></button>
        </div>
      </div>
      <div className="task-board">
        <div className="ToDo">
          <div className="todo-heading">
            <p>ToDo</p>
            <span></span>
          </div>
          <div className="card-container">
            {toDo_tasks.map((task) => {
              return <TaskCard task={task} />;
            })}
          </div>
        </div>
        <div className="inprogress">
          <div className="inprogress-heading">
            <p>In Progress</p>
            <span></span>
          </div>
          <div className="card-container">
            {inprogress_tasks.map((task) => {
              return <TaskCard task={task} />;
            })}
          </div>
        </div>
        <div className="complete">
          <div className="complete-heading">
            <p>Completed</p>
            <span></span>
          </div>
          <div className="card-container">
            {completed_tasks.map((task) => {
              return <TaskCard task={task} />;
            })}
          </div>
        </div>
      </div>
      <div className="footer">
          <p>
            &copy; {new Date().getFullYear()} ToDoMaster 
          </p>
          <p>Powered by Matmari Shashank</p>
      </div>
      <AddTask open={showModal} onCloseModal={() => setShowModal(!showModal)} />
    </div>
  );
}

export default observer(Home);
