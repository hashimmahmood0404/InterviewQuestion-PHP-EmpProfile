# Employee Management System

A simple Employee Management System built with a React frontend and PHP backend.

The application allows users to:

- Add new employees
- View all employees
- Search employees
- Validate employee information before submission

---

## Tech Stack

### Frontend

- React
- JavaScript / TypeScript
- Vite
- CSS
- HTML

### Backend

- PHP
- REST API
- MySQL

---

## Project Structure

```text
EmployeeManagementSystem/
│
├── backend/
│   ├── api/
│   │   └── employeeAPI.php
│   ├── service/
│   │   └── employeeService.php
│   │   └── employeeValidator.php
│   └── data
│       └── employees.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── EmployeeForm.jsx
│   │   │   └── EmployeeList.jsx
│   │   │
│   │   ├── service/
│   │   │   └── employeeApi.js
│   │   │   └── employeeValidation.js
│   │   │
│   │   ├── App.jsx
│   │   └── ...
│   │
│   ├── package.json
│   └── ...
│
└── README.md


--


## How to run the project

    ## Backend
    To run the PHP server at the backend, run the following command
    1. cd backedn
    2. php -S localhost:8000

    ## Frontend
    To run the react fronend, run the following command
    1. cd frontend
    2. npm install
    3. npm run dev

    ## In browser open http://localhost:5173/

