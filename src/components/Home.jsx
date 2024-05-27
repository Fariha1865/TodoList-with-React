import React, { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { RiDeleteBin5Fill } from "react-icons/ri";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import './toast.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [deletingIndex, setDeletingIndex] = useState(null);
  const [taskModals, setTaskModals] = useState([]);
  

  const successToast = (success) => {

    console.log("called")
    toast.success(success, {
        className: 'custom-toast',
        autoClose: 4000,
    })
}
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
      setTaskModals(new Array(JSON.parse(storedTasks).length).fill(false));
    }
  }, []);

  const getDaysDifference = (date1, date2) => {
    const diffTime = Math.abs(date2 - date1);
    return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 1);
  };

  const handleDeleteTask = (index) => {
    setDeletingIndex(index);
    const newTaskModals = [...taskModals];
    newTaskModals[index] = true;
    setTaskModals(newTaskModals);
  };

  const confirmDeleteTask = () => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(deletingIndex, 1);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    const newTaskModals = [...taskModals];
    newTaskModals[deletingIndex] = false;
    setTaskModals(newTaskModals);
    successToast('Deleted Successfully');
  };

  const cancelDeleteTask = () => {
    const newTaskModals = [...taskModals];
    newTaskModals[deletingIndex] = false;
    setTaskModals(newTaskModals);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex justify-between p-4">
        <div>
          <h1 className="text-4xl font-bold mb-2">👋 Good evening</h1>
          <p className="text-gray-600">Unlock your productivity potential. 🔒</p>
        </div>
        <div className="flex items-center">
          <FaUserCircle size={40} className="text-gray-600" />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="text-center mb-8">
          <p className="text-lg">You don't have any tasks yet</p>
          <p className="text-gray-500">Click on the + button to add one</p>
        </div>
        {tasks.map((task, index) => {
          const currentDate = new Date();
          const deadlineDate = new Date(task.deadline);
          const isOverdue = deadlineDate < currentDate;
          const daysDifference = getDaysDifference(currentDate, deadlineDate);

          return (
            <div key={index} className="mb-4 p-4 border border-gray-300 rounded-lg" style={{ backgroundColor: task.color }}>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  {task.emoji && (
                    <img src={task.emoji} alt="Task Emoji" />
                  )}
                  <div className='ml-5'>
                    <div className='flex justify-between gap-20'>
                      <h3 className="text-lg font-bold">{task.taskName}</h3>
                      <span className="text-gray-500"><span className='font-bold text-black mr-2 text-sm'>Deadline:</span> {deadlineDate.toLocaleString()}</span>
                    </div>
                    <p className="text-gray-700 mt-2">{task.description}</p>
                    {isOverdue && (
                      <p className="text-red-500 mt-2">Task not completed on time ({daysDifference} days ago)</p>
                    )}
                    <div className="mt-2 flex items-center justify-between">
                      <span className={`rounded ${task.color}`}><span className='font-bold text-black mr-2 text-sm'>Category:</span> {task.category}</span>
                      <span className="px-2 py-1 rounded bg-gray-200">{task.priority} priority</span>
                      <RiDeleteBin5Fill className='text-2xl cursor-pointer' onClick={() => handleDeleteTask(index)} />
                      <Modal
                        open={taskModals[index]}
                        center
                        closeIcon={null}
                      >
                        <h2 className='p-10'>Are you sure you want to delete the task?</h2>
                        <div className="flex justify-center gap-4 mt-4">
                          <button className="btn btn-danger" onClick={confirmDeleteTask}>Yes, delete</button>
                          <button className="btn btn-primary" onClick={cancelDeleteTask}>Cancel</button>
                        </div>
                      </Modal>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <ToastContainer position="top-right" className="mr-20" autoClose={3000} />
        <Link to="/form">
          <div className="fixed bottom-20 right-20">
            <motion.button
              className="btn btn-primary btn-circle"
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                duration: 1,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
              }}
              whileHover={{ scale: 1.8 }}
              
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
              </svg>
            </motion.button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
