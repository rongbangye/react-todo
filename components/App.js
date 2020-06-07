import React, { useState } from 'react';
import Todo from "./Todo";
import Form from "./Form";
import FilterButton from "./FilterButton";
import { nanoid } from "nanoid";

// Defining these constants outside our App() function
// If defined inside it, would be recalculated every time <App /> renders. 
const FILTER_MAP = {
  // shows all tasks, return true for all tasks
  All: () => true,
  // show tasks whose completed prop is false
  Active: task => !task.completed,
  // shows tasks whose completed prop is true
  Completed: task => task.completed
};

// using the Object.keys method to collect an array of FILTER_NAMES;
const FILTER_NAMES = Object.keys(FILTER_MAP);

export default function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState("All");
  // counting the length of tasks and changing the text of our heading accordingly
  const tasksNoun = tasks.length !== 1 ? 'tasks' : 'task';
  const headingText = `${tasks.length} ${tasksNoun} remaining`;

  function toggleTaskCompleted(id) {
    // console.log(tasks[0]); test the method
    const updatedTasks = tasks.map(task => {
      if (id === tasks.id) {
        return {...task, completed: !task.completed}
      }
      return task;
    })
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    // console.log(id);
    const remainingTasks = tasks.filter(task => id!== task.id);
    setTasks(remainingTasks);
  }

  // pass addTask into Form as prop
  function addTask(name) {
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
    setTasks([...tasks, newTask]);
  }

  function editTask(id, newName) {
    const editTaskList = tasks.map(task => {
      if (id == task.id) {
        return {...task, name: newName}
      }
      return task;
    });
    setTasks(editTaskList);
  }

  // iterate Todo and store it at taskList
  const taskList = tasks.map(task => (
      <Todo
          id={task.id}
          name={task.name}
          completed={task.completed}
          key={task.id}
          toggleTaskCompleted={toggleTaskCompleted}
          deleteTask={deleteTask}
          editTask={editTask}
        />
      )
    );

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask}/>
      <FilterButton />
      <h2 id="list-heading">
        {headingText}
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

