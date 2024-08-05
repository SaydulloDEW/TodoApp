import React, { useState, useEffect } from 'react';
import { TodoForm } from './TodoForm';
import { v4 as uuidv4 } from 'uuid';
import { Todo } from './Todo';
import { EditTodoForm } from './EditTodoForm';
uuidv4();

export const TodoWrapperLocalStorage = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const savedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
        if (savedEmployees.length === 0) {
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
                    localStorage.setItem('employees', JSON.stringify(initialEmployees));
                });
        } else {
            setEmployees(savedEmployees);
        }
    }, []);

    const addEmployee = name => {
        const newEmployees = [...employees, { id: uuidv4(), name, avatar: '', completed: false, isEditing: false }];
        setEmployees(newEmployees);
        localStorage.setItem('employees', JSON.stringify(newEmployees));
    };

    const toggleComplete = id => {
        const newEmployees = employees.map(employee => employee.id === id ? { ...employee, completed: !employee.completed } : employee);
        setEmployees(newEmployees);
        localStorage.setItem('employees', JSON.stringify(newEmployees));
    };

    const deleteEmployee = id => {
        const newEmployees = employees.filter(employee => employee.id !== id);
        setEmployees(newEmployees);
        localStorage.setItem('employees', JSON.stringify(newEmployees));
    };

    const editEmployee = id => {
        setEmployees(employees.map(employee => employee.id === id ? { ...employee, isEditing: !employee.isEditing } : employee));
    };

    const editEmployeeTask = (name, id) => {
        const newEmployees = employees.map(employee => employee.id === id ? { ...employee, name, isEditing: !employee.isEditing } : employee);
        setEmployees(newEmployees);
        localStorage.setItem('employees', JSON.stringify(newEmployees));
    };

    return (
        <div className='TodoWrapper'>
            <h1>List of Employees</h1>
            <TodoForm addEmployee={addEmployee} />
            {employees.map((employee) => (
                employee.isEditing ? (
                    <EditTodoForm key={employee.id} editEmployee={editEmployeeTask} employee={employee} />
                ) : (
                    <Todo employee={employee} key={employee.id} toggleComplete={toggleComplete} deleteEmployee={deleteEmployee} editEmployee={editEmployee} />
                )
            ))}
        </div>
    );
};
