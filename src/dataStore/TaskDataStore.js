import { observable, action, makeObservable } from "mobx";

class TaskDataStore {
  copy_taskData = [
    {
      id: 1,
      name: "Design login page",
      subTasks: [
        {
          St_id: 1,
          st_name: "page design",
          st_status: "done",
        },
        {
          St_id: 2,
          st_name: "add functionality",
          st_status: "done",
        },
        {
          St_id: 3,
          st_name: "test the login page",
          st_status: "done",
        },
      ],
      status: "done",
    },
    {
      id: 2,
      name: "Design profile page",
      subTasks: [
        {
          St_id: 1,
          st_name: "page design",
          st_status: "todo",
        },
        {
          St_id: 2,
          st_name: "add profile details",
          st_status: "todo",
        },
        {
          St_id: 3,
          st_name: "fetch the profile details",
          st_status: "todo",
        },
      ],
      status: "todo",
    },
    {
      id: 3,
      name: "Design home page",
      subTasks: [
        {
          St_id: 1,
          st_name: "Home page design",
          st_status: "inprogress",
        },
        {
          St_id: 2,
          st_name: "add home page functionality",
          st_status: "inprogress",
        },
        {
          St_id: 3,
          st_name: "connect the pages",
          st_status: "inprogress",
        },
      ],
      status: "inprogress",
    },
    {
      id: 4,
      name: "application testing",
      subTasks: [
        {
          St_id: 1,
          st_name: "add validation for user login",
          st_status: "todo",
        },
        {
          St_id: 2,
          st_name: "check the navitgation functionality",
          st_status: "todo",
        },
        {
          St_id: 3,
          st_name: "test the entire application",
          st_status: "todo",
        },
      ],
      status: "todo",
    },
  ];

  tasks = [];

  updateLocalstorage = () => {
    const storedUserInfo = localStorage.getItem("userInfo");
    const parsedUserInfo = storedUserInfo ? JSON.parse(storedUserInfo) : {};

    const updatedData = {
      ...parsedUserInfo,
      taskData: this.tasks,
    };
    localStorage.setItem("userInfo", JSON.stringify(updatedData));
  };

  constructor() {
    makeObservable(this, {
      copy_taskData: observable,
      tasks: observable,
      updateLocalstorage: action,
      addTask: action,
      updateTaskStatus: action,
      updateSubTaskStatus: action,
      deleteTask: action,
      editTaskDetails: action,
      editSubTaskDetails: action,
    });
  }

  addTask = (newTask) => {
    this.tasks.push(newTask);
    this.updateLocalstorage();
  };

  updateTaskStatus = (id, status) => {
    const taskToUpdate = this.tasks.find((task) => task.id === id);
    if (!taskToUpdate) return;

    if (status === "done") {
      const allSubtasksDone = taskToUpdate.subTasks.every(
        (sbt) => sbt.st_status === "done"
      );
      if (allSubtasksDone) {
        taskToUpdate.status = status;
      } else {
        alert("All subtasks need to be completed first");
      }
    } else if (status === "inprogress" || status === "todo") {
      const allSubtasksDone = taskToUpdate.subTasks.every(
        (sbt) => sbt.st_status === "done"
      );
      console.log(allSubtasksDone);
      if (allSubtasksDone) {
        taskToUpdate.status = taskToUpdate.status;
      } else {
        taskToUpdate.subTasks.forEach((sbt) => (sbt.st_status = "inprogress"));
        taskToUpdate.status = status;
      }
    } else {
      taskToUpdate.status = status;
    }
    this.updateLocalstorage();
  };

  updateSubTaskStatus = (taskId, subTaskId, newStatus) => {
    const taskToUpdate = this.tasks.find((task) => task.id === taskId);
    if (!taskToUpdate) return; // Task not found

    const subTaskToUpdate = taskToUpdate.subTasks.find(
      (sbt) => sbt.St_id === subTaskId
    );
    if (!subTaskToUpdate) return; // Subtask not found

    subTaskToUpdate.st_status = newStatus; // Update subtask status

    // If all subtasks are 'done', update task status to 'done'
    if (
      newStatus === "done" &&
      taskToUpdate.subTasks.every((sbt) => sbt.st_status === "done")
    ) {
      taskToUpdate.status = "done";
    }
    this.updateLocalstorage();
  };

  deleteTask = (id) => {
    this.tasks = this.tasks.filter((task) => {
      return task.id !== id;
    });
    this.updateLocalstorage();
  };

  editTaskDetails = (taskData) => {
    const taskToUpdate = this.tasks.find((task) => task.id === taskData.id);
    if (taskToUpdate) {
      taskToUpdate.name = taskData.name;
      taskData.subTasks.forEach((sbt) => {
        this.editSubTaskDetails(taskData.id, sbt);
      });
    }
    this.updateLocalstorage();
  };

  editSubTaskDetails = (id, subTask) => {
    const taskToUpdate = this.tasks.find((task) => task.id === id);
    if (taskToUpdate) {
      const subTaskToUpdate = taskToUpdate.subTasks.find(
        (sbt) => sbt.St_id === subTask.St_id
      );
      if (subTaskToUpdate) {
        subTaskToUpdate.st_name = subTask.st_name;
      } else {
        taskToUpdate.subTasks.push(subTask);
      }
    }
    this.updateLocalstorage();
  };
}

export default TaskDataStore;
