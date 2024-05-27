// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/homePage/Home';
import TaskForm from './components/form/AddTaskForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<TaskForm />} />
       
      </Routes>
    </Router>
  );
};

export default App;
