// Home.js
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';
import TaskList from './TaskList';
import AddTaskButton from './AddTaskButton';
import './toast.css';

const Home = () => {
  const [tasks, setTasks] = useState([]);

  const successToast = (success) => {
    toast.success(success, {
      className: 'custom-toast',
      autoClose: 2000,
    });
  };

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    successToast('Deleted Successfully');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header />
      <div className="flex flex-col items-center justify-center flex-grow">
        {tasks.length === 0 ? (
          <div className="text-center mb-8">
            <p className="text-lg">You don't have any tasks yet</p>
            <p className="text-gray-500">Click on the + button to add one</p>
          </div>
        ) : (
          <TaskList tasks={tasks} handleDeleteTask={handleDeleteTask} />
        )}
        <AddTaskButton />
      </div>
      <ToastContainer position="top-right" className="mr-20" autoClose={3000} />
    </div>
  );
};

export default Home;
