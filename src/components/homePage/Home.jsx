// Home.js
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';
import TaskList from './TaskList';
import AddTaskButton from './AddTaskButton';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import './toast.css';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [deletingIndex, setDeletingIndex] = useState(null);
  const [taskModals, setTaskModals] = useState([]);

  const successToast = (success) => {
    toast.success(success, {
      className: 'custom-toast',
      autoClose: 4000,
    });
  };

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
      setTaskModals(new Array(JSON.parse(storedTasks).length).fill(false));
    }
  }, []);

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
      <Header />
      <TaskList tasks={tasks} handleDeleteTask={handleDeleteTask} />
      <ConfirmDeleteModal 
        isOpen={deletingIndex !== null && taskModals[deletingIndex]}
        onClose={cancelDeleteTask}
        onConfirm={confirmDeleteTask}
      />
      <AddTaskButton />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Home;
