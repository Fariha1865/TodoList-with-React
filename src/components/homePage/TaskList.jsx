import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, handleDeleteTask }) => (
  <div className="flex flex-col items-center justify-center flex-grow">
    {tasks.length === 0 ? (
      <div className="text-center mb-8">
        <p className="text-lg">You don't have any tasks yet</p>
        <p className="text-gray-500">Click on the + button to add one</p>
      </div>
    ) : (
      tasks.map((task, index) => (
        <TaskItem 
          key={index} 
          task={task} 
          index={index} 
          handleDeleteTask={handleDeleteTask} 
        />
      ))
    )}
  </div>
);

export default TaskList;
