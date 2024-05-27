import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AddTaskButton = () => (
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
);

export default AddTaskButton;
