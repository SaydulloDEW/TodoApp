import React, { useState } from 'react';

export const EditTodoForm = ({ editEmployee, employee }) => {
  const [value, setValue] = useState(employee.name);

  const handleSubmit = (e) => {
    e.preventDefault();
    editEmployee(value, employee.id);
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="todo-input"
        placeholder='Update employee'
      />
      <button type="submit" className='todo-btn'>Update Employee</button>
    </form>
  );
};
