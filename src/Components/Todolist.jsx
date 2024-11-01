import React, { useState, useEffect } from 'react';

const Todolist = () => {
    const [tasklist, setTasklist] = useState([]);
    const [newtask, setNewtask] = useState('');

    // Load tasks from local storage on component mount
    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasklist')) || [];
        setTasklist(savedTasks);
    }, []);

    const addtask = () => {
        if (newtask.trim()) {
            const updatedTaskList = [...tasklist, newtask];
            setTasklist(updatedTaskList);
            localStorage.setItem('tasklist', JSON.stringify(updatedTaskList));
            setNewtask(''); // Clear the input
        } else {
            alert("Task cannot be empty!"); // Optional: Alert for empty input
        }
    };

    const deleteall = () => {
        setTasklist([]);
        localStorage.clear();
    };
    const deleteonetask = (index) => {
        const updatedTaskList = tasklist.filter((_, i) => i !== index); // Remove task at the given index
        setTasklist(updatedTaskList);
        localStorage.setItem('tasklist', JSON.stringify(updatedTaskList)); // Update local storage
    }

    return (
        <>
            <div className="max-w-screen-md mx-auto flex space-x-10 mt-20">
                {/* Task Input Section */}
                <div>
                    <div className="card card-body border bg-pink-500 border-white shadow-md bg-slate-100 outline-none">
                        <label htmlFor="task" className="text-white font-semibold text-xl">
                            Add New Task
                        </label>
                        <div>
                            <button type="button" onClick={deleteall} className='btn bg-neutral-400 border-red-540 text-red-500'>Delete All</button>
                        </div>

                        <div className="flex items-center space-x-2 mt-2">
                            <input
                                type="text"
                                id="task"
                                placeholder="Enter new task"
                                value={newtask}
                                onChange={(e) => setNewtask(e.target.value)}
                                className="w-80 h-10 border outline-none hover:border-white shadow-sm rounded-md"
                            />
                            <button
                                type="button"
                                onClick={addtask}
                                className="btn hover:bg-green-500 border border-slate-200 text-black hover:text-white"
                            >
                                Add Task
                            </button>
                        </div>
                    </div>
                </div>

                {/* Task List Section */}
                <div className="card card-body border border-slate-500 shadow-md bg-white w-full">
                    <h1 className="text-black font-semibold text-xl mb-4">Task List</h1>
                    <ul className="list-disc pl-5 space-y-2">
                        {tasklist.map((task, index) => (
                            <li key={index} className="border-b border-slate-300 pb-2 flex justify-between items-center">
                                {task}
                                <span className="flex items-center space-x-2">
                                    <span
                                        className='text-green-500 cursor-pointer'
                                    >
                                        ✓
                                    </span>
                                    <span
                                        className='text-red-800 mx-5 cursor-pointer'
                                        onClick={() => deleteonetask(index)}
                                    >
                                        ✖
                                    </span>
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Todolist;
