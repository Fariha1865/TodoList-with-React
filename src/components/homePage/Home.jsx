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
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);
  console.log(tasks)

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    successToast('Deleted Successfully');
  };

  const getUniqueCategories = (tasks) => {
    const categories = tasks.map(task => task.category);
    return ['All', ...new Set(categories)];
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
      console.log(sortedTasks)
      return sortedTasks;
    });
  };

  const handleEditTask = (index, updatedTask) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = updatedTask;
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    successToast('Task Updated Successfully');
  };

  const filteredTasks = activeCategory === 'All' ? tasks : tasks.filter(task => task.category === activeCategory);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="flex flex-col items-center justify-center flex-grow">
        {tasks.length === 0 ? (
          <div className="text-center mb-8">
            <p className="text-lg">You don't have any tasks yet</p>
            <p className="text-gray-500">Click on the + button to add one</p>
          </div>
        ) : (
          <>
            <Tabs
              categories={getUniqueCategories(tasks)}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
            <div className="fixed top-4 right-4">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={toggleSortOrder}>
                Sort by Priority <RiArrowUpDownFill className="inline-block ml-1" />
              </button>
            </div>
            <TaskList tasks={filteredTasks} handleDeleteTask={handleDeleteTask} handleEditTask={handleEditTask}/>
          </>
        )}
        <AddTaskButton />
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Home;
