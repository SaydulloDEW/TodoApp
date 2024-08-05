import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

export const Todo = ({ employee, deleteEmployee, editEmployee, toggleComplete }) => {
  return (
    <div className="Todo">
      <img src={employee.avatar} alt={employee.name} />
      <p className={`${employee.completed ? "completed" : "incompleted"}`} onClick={() => toggleComplete(employee.id)}>
        {employee.name}
      </p>
      <div>
        <FontAwesomeIcon className="edit-icon" icon={faPenToSquare} onClick={() => editEmployee(employee.id)} />
        <FontAwesomeIcon className="delete-icon" icon={faTrash} onClick={() => deleteEmployee(employee.id)} />
      </div>
    </div>
  );
};
