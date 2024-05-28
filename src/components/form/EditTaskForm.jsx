import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt } from 'react-icons/fa';
import Picker from "emoji-picker-react";
import CustomDropdown from './CustomDropdown';

const categories = [
    { value: 'home', label: 'Home', color: 'bg-red-100' },
    { value: 'work', label: 'Work', color: 'bg-blue-100' },
    { value: 'personal', label: 'Personal', color: 'bg-green-100' },
    { value: 'health', label: 'Health', color: 'bg-yellow-100' },
    { value: 'education', label: 'Education', color: 'bg-purple-100' },
];

const EditTaskForm = ({ task, onSave }) => {
    const [taskName, setTaskName] = useState(task.taskName);
    const [description, setDescription] = useState(task.description);
    const [deadline, setDeadline] = useState(new Date(task.deadline));
    const [category, setCategory] = useState(task.category);
    const [color, setColor] = useState(task.color);
    const [priority, setPriority] = useState(0);
    const [showPriority, setShowPriority] = useState('Select');
    const [showPicker, setShowPicker] = useState(false);
    const [chosenEmoji, setChosenEmoji] = useState({ target: { src: task.emoji } });
    const [showModal, setShowModal] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [categoriesList, setCategoriesList] = useState([]);

    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject);
        setShowPicker(false);
    };

    useEffect(() => {
        const storedCategories = localStorage.getItem('categories');
        if (storedCategories) {
            setCategoriesList(JSON.parse(storedCategories));
        } else {
            setCategoriesList(categories);
            localStorage.setItem('categories', JSON.stringify(categories));
        }
    }, []);

    const handleAddCategory = () => {
        const newCategory = { value: newCategoryName.toLowerCase(), label: newCategoryName, color: 'bg-gray-100' };
        const updatedCategoriesList = [...categoriesList, newCategory];
        setCategoriesList(updatedCategoriesList);
        localStorage.setItem('categories', JSON.stringify(updatedCategoriesList));
        setNewCategoryName('');
        setShowModal(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedTask = {
            ...task,
            taskName,
            description,
            deadline,
            category,
            color,
            priority,
            emoji: chosenEmoji ? chosenEmoji.target.src : null
        };
        onSave(updatedTask);
    };


    const settingPriority = (e) =>{
        console.log(e.target.value)
        if(e.target.value=="high")
        {
            setPriority(1)
            setShowPriority("high")
        }else if(e.target.value=="medium")
        {
            setPriority(2)
            setShowPriority("medium")
        }else if(e.target.value=="low"){
            setPriority(3)
            setShowPriority("low")
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8 p-8 border border-purple-500 rounded-lg">
            <div>
                {chosenEmoji ? (
                    <span className='flex justify-center w-84 h-10 mb-10'>
                        <img
                            src={chosenEmoji.target.src}
                            onClick={() => { setShowPicker(true) }}
                            alt="Selected Emoji"
                        />
                    </span>
                ) : (
                    <div>
                        <span className='flex justify-center items-center w-84 h-10 mb-3'>
                            <svg
                                className="rounded-full border-2 border-purple-500 p-1 text-purple-500"
                                focusable="false"
                                aria-hidden="true"
                                viewBox="0 0 24 24"
                                data-testid="AddReactionIcon"
                                fill="currentColor"
                                width="40"
                                height="40"
                                onClick={() => { setShowPicker(true) }}
                            >
                                <path d="M18 9V7h-2V2.84C14.77 2.3 13.42 2 11.99 2 6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12c0-1.05-.17-2.05-.47-3zm-2.5-1c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5m-7 0c.83 0 1.5.67 1.5 1.5S9.33 11 8.5 11 7 10.33 7 9.5 7.67 8 8.5 8m3.5 9.5c-2.33 0-4.31-1.46-5.11-3.5h10.22c-.8 2.04-2.78 3.5-5.11 3.5M22 3h2v2h-2v2h-2V5h-2V3h2V1h2z"></path>
                            </svg>
                        </span>
                        <h1 className='text-center mb-8'>Choose Emoji</h1>
                    </div>
                )}
                {showPicker && <Picker onEmojiClick={onEmojiClick} />}
            </div>

            <div className="mb-4">
                <label htmlFor="taskName" className="block text-sm font-bold">Task Name</label>
                <input type="text" id="taskName" value={taskName} onChange={(e) => setTaskName(e.target.value)} className="mt-1 focus:ring-purple-500 focus:border-purple-500 block w-full h-10 sm:text-sm border border-gray-300 rounded-md" />
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-bold">Description</label>
                <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 focus:ring-purple-500 focus:border-purple-500 block w-full h-10 sm:text-sm border border-gray-300 rounded-md" />
            </div>
            <div className="mb-4">
                <label htmlFor="deadline" className="block text-sm font-bold">Deadline</label>
                <div className="relative flex items-center">
                    <DatePicker id="deadline" selected={deadline} onChange={(date) => setDeadline(date)} className="mt-1 focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border border-gray-300 rounded-md pl-10" />
                    <FaCalendarAlt className="absolute ml-44" />
                </div>
            </div>
            <div className="mb-4">
                <label htmlFor="category" className="block text-sm font-bold">Category</label>
                {categoriesList.length > 0 && <CustomDropdown value={category} onChange={setCategory} options={categoriesList} />}
            </div>
            <div className="mb-4">
                <button type="button" onClick={() => setShowModal(true)} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">Add New Category</button>
            </div>

            {showModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Create New Category</h3>
                                        <div className="mt-2">
                                            <input type="text" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} className="mt-1 focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border border-gray-300 rounded-md" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button type="button" onClick={handleAddCategory} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm">Save</button>
                                <button type="button" onClick={() => setShowModal(false)} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="mb-4">
                <label htmlFor="priority" className="block text-sm font-bold">Priority</label>
                <select id="priority" value={showPriority} onChange={(e) => settingPriority(e)} className="mt-1 block w-full h-10 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm">
                    <option value="select">Select</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>

            <div className="flex justify-center">
                <button type="submit" className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600">Save Task</button>
            </div>
        </form>
    );
};

export default EditTaskForm;
