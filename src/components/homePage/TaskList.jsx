import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, handleDeleteTask }) => {
  return (
    <div>
      {tasks.map((task, index) => (
        <TaskItem key={index} task={task} index={index} handleDeleteTask={handleDeleteTask} />
      ))}
    </div>
  );
};

export default TaskList;
