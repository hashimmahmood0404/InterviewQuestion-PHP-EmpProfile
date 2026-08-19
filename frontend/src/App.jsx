import { useState } from "react";
import EmployeeForm from "./component/EmployeeForm";
import EmployeeList from "./component/EmployeeList";
import "./App.css";

function App() {

    const [currentPage, setCurrentPage] =
        useState("employees");

    const [refreshKey, setRefreshKey] =
        useState(0);

    const handleEmployeeCreated = () => {

        setRefreshKey(
            (previous) => previous + 1
        );

        setCurrentPage("employees");
    };

    return (
        <div className="app">

            <header className="navbar">

                <div className="logo">
                    Employee Management
                </div>

                <nav>

                    <button
                        className={
                            currentPage === "employees"
                                ? "nav-button active"
                                : "nav-button"
                        }
                        onClick={() =>
                            setCurrentPage("employees")
                        }
                    >
                        Employees
                    </button>

                    <button
                        className={
                            currentPage === "add"
                                ? "nav-button active"
                                : "nav-button"
                        }
                        onClick={() =>
                            setCurrentPage("add")
                        }
                    >
                        + Add Employee
                    </button>

                </nav>

            </header>


            <main>

                {currentPage === "add" ? (

                    <EmployeeForm
                        onEmployeeCreated={
                            handleEmployeeCreated
                        }
                    />

                ) : (

                    <EmployeeList
                        refreshKey={refreshKey}
                    />

                )}

            </main>

        </div>
    );
}

export default App;