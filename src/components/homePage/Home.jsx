import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';
import TaskList from './TaskList';
import AddTaskButton from './AddTaskButton';
import Tabs from './Tabs';
import './toast.css';
import { RiArrowUpDownFill } from "react-icons/ri";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('desc');

  const successToast = (success) => {
    toast.success(success, {
      className: 'custom-toast',
      autoClose: 4000,
    });
  };

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    const storedCompletedTasks = localStorage.getItem('completedTasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
    if (storedCompletedTasks) {
      setCompletedTasks(JSON.parse(storedCompletedTasks));
    }
  }, []);

  const handleDeleteTask = (index, isCompleted = false) => {
    if (isCompleted) {
      const updatedCompletedTasks = [...completedTasks];
      updatedCompletedTasks.splice(index, 1);
      setCompletedTasks(updatedCompletedTasks);
      localStorage.setItem('completedTasks', JSON.stringify(updatedCompletedTasks));
    } else {
      const updatedTasks = [...tasks];
      updatedTasks.splice(index, 1);
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
  
    successToast('Deleted Successfully');
  };
  

  const handleCompleteTask = (index) => {
    const updatedTasks = [...tasks];
    const completedTask = updatedTasks.splice(index, 1)[0];
    setTasks(updatedTasks);
    setCompletedTasks([...completedTasks, completedTask]);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    localStorage.setItem('completedTasks', JSON.stringify([...completedTasks, completedTask]));
    successToast('Task Completed Successfully');
  };

  const handleEditTask = (index, updatedTask, isCompleted = false) => {
    const taskList = isCompleted ? completedTasks : tasks;
    const updatedTasks = [...taskList];
    updatedTasks[index] = updatedTask;

    if (isCompleted) {
      setCompletedTasks(updatedTasks);
      localStorage.setItem('completedTasks', JSON.stringify(updatedTasks));
    } else {
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    successToast('Task Updated Successfully');
  };

  const getUniqueCategories = (tasks) => {
    const categories = tasks.map(task => task.category);
    return ['All', 'Completed', ...new Set(categories)];
  };

  const toggleSortOrder = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);

    setTasks((prevTasks) => {
      const sortedTasks = [...prevTasks].sort((a, b) => {
        if (newSortOrder === 'asc') {
          return a.priority - b.priority;
        } else {
          return b.priority - a.priority;
        }
      });
      return sortedTasks;
    });
  };

  const filteredTasks = activeCategory === 'Completed' ? completedTasks : (activeCategory === 'All' ? tasks : tasks.filter(task => task.category === activeCategory));

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="flex flex-col items-center justify-center flex-grow">
        {tasks.length === 0 && completedTasks.length === 0 ? (
          <div className="text-center mb-8">
            <p className="text-lg">You don't have any tasks yet</p>
            <p className="text-gray-500">Click on the + button to add one</p>
          </div>
        ) : (
          <>
            <Tabs
              categories={getUniqueCategories([...tasks, ...completedTasks])}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
           {
            activeCategory === "Completed" ? 
            <div></div>
            :
            <div className="fixed top-4 right-4 m-5">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={toggleSortOrder}>
              Sort by Priority <RiArrowUpDownFill className="inline-block ml-1" />
            </button>
          </div>
           }
            <TaskList tasks={filteredTasks} handleDeleteTask={handleDeleteTask} handleCompleteTask={handleCompleteTask} handleEditTask={handleEditTask} activeCategory ={activeCategory } />
          </>
        )}
        <AddTaskButton />
      </div>
      <ToastContainer position="top-right" className="mr-20" autoClose={3000} />
    </div>
  );
};

export default Home;
