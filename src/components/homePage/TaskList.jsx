import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, handleDeleteTask,handleEditTask,handleCompleteTask,activeCategory  }) => {
  return (
    <div>
      {tasks.map((task, index) => (
        <TaskItem key={index} task={task} index={index} handleDeleteTask={handleDeleteTask} handleEditTask={handleEditTask} handleCompleteTask={handleCompleteTask} activeCategory ={activeCategory }/>
      ))}
    </div>
  );
};

export default TaskList;
