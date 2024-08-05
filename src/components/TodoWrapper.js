import React, { useState, useEffect } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditTodoForm";

export const TodoWrapper = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch('https://reqres.in/api/users')
      .then(response => response.json())
      .then(data => {
        const initialEmployees = data.data.map(user => ({
          id: user.id,
          name: user.first_name + ' ' + user.last_name,
          avatar: user.avatar,
          completed: false,
          isEditing: false
        }));
        setEmployees(initialEmployees);
      });
  }, []);

  const addEmployee = (name) => {
    setEmployees([
      ...employees,
      { id: uuidv4(), name, avatar: '', completed: false, isEditing: false },
    ]);
  };

  const deleteEmployee = (id) => setEmployees(employees.filter((employee) => employee.id !== id));

  const toggleComplete = (id) => {
    setEmployees(
      employees.map((employee) =>
        employee.id === id ? { ...employee, completed: !employee.completed } : employee
      )
    );
  };

  const editEmployee = (id) => {
    setEmployees(
      employees.map((employee) =>
        employee.id === id ? { ...employee, isEditing: !employee.isEditing } : employee
      )
    );
  };

  const editEmployeeTask = (name, id) => {
    setEmployees(
      employees.map((employee) =>
        employee.id === id ? { ...employee, name, isEditing: !employee.isEditing } : employee
      )
    );
  };

  return (
    <div className="TodoWrapper">
      <h1>List of Employees</h1>
      <TodoForm addEmployee={addEmployee} />
      {employees.map((employee) =>
        employee.isEditing ? (
          <EditTodoForm key={employee.id} editEmployee={editEmployeeTask} employee={employee} />
        ) : (
          <Todo
            key={employee.id}
            employee={employee}
            deleteEmployee={deleteEmployee}
            editEmployee={editEmployee}
            toggleComplete={toggleComplete}
          />
        )
      )}
    </div>
  );
};
