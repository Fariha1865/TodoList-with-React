import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, handleDeleteTask,handleEditTask }) => {
  return (
    <div>
      {tasks.map((task, index) => (
        <TaskItem key={index} task={task} index={index} handleDeleteTask={handleDeleteTask} handleEditTask={handleEditTask} />
      ))}
    </div>
  );
};

export default TaskList;
