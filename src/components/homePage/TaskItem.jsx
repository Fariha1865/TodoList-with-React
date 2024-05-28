import React, { useState } from 'react';
import { RiDeleteBin5Fill, RiEdit2Fill, RiCheckFill } from "react-icons/ri";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import EditTaskForm from '../form/EditTaskForm';
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'

const getDaysDifference = (date1, date2) => {
  const diffTime = date2 - date1;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const TaskItem = ({ task, index, handleDeleteTask, handleEditTask, handleCompleteTask, activeCategory }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const currentDate = new Date();
  const deadlineDate = new Date(task.deadline);
  const daysDifference = getDaysDifference(currentDate, deadlineDate);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);

  const confirmDeleteTask = () => {

    if (activeCategory === "Completed") {
      handleDeleteTask(index, activeCategory === 'Completed');
    }
    else {
      handleDeleteTask(index);
    }
    closeModal();
  };

  let deadlineText;
  if (daysDifference < 0) {
    deadlineText = `Task not completed on time (${Math.abs(daysDifference)} days ago)`;
  } else if (daysDifference === 0) {
    deadlineText = "Task is due today";
  } else {
    deadlineText = `Task is due in ${daysDifference} days`;
  }

  const handleSaveEditedTask = (updatedTask) => {
    handleEditTask(index, updatedTask);
    closeEditModal();
  };

  return (
    <div className="mb-4 p-4 border border-gray-300 rounded-lg overflow-x-hidden" style={{ backgroundColor: task.color }}>
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
            {daysDifference !== 0 && (
              <p className={`mt-2 ${daysDifference < 0 ? 'text-red-500' : 'text-green-700'}`}>{deadlineText}</p>
            )}
            <div className="mt-2 flex justify-between items-center">
              <span className={`rounded ${task.color}`}>
                <span className='font-bold text-black mr-2 text-sm'>Category:</span> {task.category}
              </span>
              <span className="px-2 py-1 rounded bg-gray-200 ml-3">{task.priority == 1 ? "High" : task.priority == 2 ? "Medium" : "Low"} priority</span>
              <div className="flex space-x-2">
                {activeCategory !== 'Completed' && (
                  <>
                    <RiEdit2Fill className='text-2xl cursor-pointer ml-3' onClick={openEditModal} data-tooltip-id="edit-tooltip" data-tooltip-content="Edit Task"/>
                    <RiCheckFill className='text-2xl cursor-pointer' onClick={() => handleCompleteTask(index)} data-tooltip-id="complete-tooltip" data-tooltip-content="Complete Task"/>
                  </>
                )}
             
                  <RiDeleteBin5Fill className='text-2xl cursor-pointer' onClick={openModal} data-tooltip-id="delete-tooltip" data-tooltip-content="Delete Task"/>
                  <Tooltip id="delete-tooltip" />
                  <Tooltip id="edit-tooltip" />
                  <Tooltip id="complete-tooltip" />
                

              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal open={isModalOpen} onClose={closeModal} center>
        <h2 className='p-10'>Are you sure you want to delete the task?</h2>
        <div className="flex justify-center gap-4 mt-4">
          <button className="btn btn-danger" onClick={confirmDeleteTask}>Yes, delete</button>
          <button className="btn btn-primary" onClick={closeModal}>Cancel</button>
        </div>
      </Modal>
      <Modal open={isEditModalOpen} onClose={closeEditModal} center>
        <EditTaskForm task={task} onSave={handleSaveEditedTask} />
      </Modal>
    </div>
  );
};

export default TaskItem;
