import React, { useState } from 'react';
import './todoform-edit.css'

export const TodoForm = ({ addEmployee }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value) {
      addEmployee(value);
      setValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="todo-input"
        placeholder='Add new employee'
      />
      <button type="submit" className='todo-btn'>Add Employee</button>
    </form>
  );
};
