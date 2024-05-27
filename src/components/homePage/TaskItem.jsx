// TaskItem.js
import React from 'react';
import { RiDeleteBin5Fill } from "react-icons/ri";
import { Modal } from 'react-responsive-modal';

const getDaysDifference = (date1, date2) => {
  const diffTime = Math.abs(date2 - date1);
  return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 1);
};

const TaskItem = ({ task, index, handleDeleteTask }) => {
  const currentDate = new Date();
  const deadlineDate = new Date(task.deadline);
  const isOverdue = deadlineDate < currentDate;
  const daysDifference = getDaysDifference(currentDate, deadlineDate);

  return (
    <div className="mb-4 p-4 border border-gray-300 rounded-lg" style={{ backgroundColor: task.color }}>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          {task.emoji && <img src={task.emoji} alt="Task Emoji" />}
          <div className='ml-5'>
            <div className='flex justify-between gap-20'>
              <h3 className="text-lg font-bold">{task.taskName}</h3>
              <span className="text-gray-500">
                <span className='font-bold text-black mr-2 text-sm'>Deadline:</span> {deadlineDate.toLocaleString()}
              </span>
            </div>
            <p className="text-gray-700 mt-2">{task.description}</p>
            {isOverdue && (
              <p className="text-red-500 mt-2">Task not completed on time ({daysDifference} days ago)</p>
            )}
            <div className="mt-2 flex items-center justify-between">
              <span className={`rounded ${task.color}`}>
                <span className='font-bold text-black mr-2 text-sm'>Category:</span> {task.category}
              </span>
              <span className="px-2 py-1 rounded bg-gray-200">{task.priority} priority</span>
              <RiDeleteBin5Fill className='text-2xl cursor-pointer' onClick={() => handleDeleteTask(index)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;