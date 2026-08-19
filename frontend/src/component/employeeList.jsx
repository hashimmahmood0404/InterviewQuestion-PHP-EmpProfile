import { useEffect, useState } from "react";
import { getEmployees } from "../service/employeeApi";

const DEPARTMENT_COLORS = {
  Engineering: "#2563eb",
  Product: "#7c3aed",
  Design: "#db2777",
  Marketing: "#d97706",
  Sales: "#059669",
  "Human Resources": "#dc2626",
  Finance: "#0891b2",
  Operations: "#6d28d9",
  Legal: "#475569",
  "Customer Support": "#047857",
};

function getInitials(name = "") {
  return name
    .trim()
    .split(" ")
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
}

function getAvatarColor(name = "") {
  const colors = [
    "#2563eb",
    "#7c3aed",
    "#db2777",
    "#d97706",
    "#059669",
    "#0891b2",
    "#dc2626",
  ];

  if (!name) return colors[0];

  const value =
    name.charCodeAt(0) +
    name.charCodeAt(name.length - 1);

  return colors[value % colors.length];
}

function formatDate(date) {
  if (!date) return "—";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString("en-MY", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function EmployeeList({ refreshKey }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadEmployees();
  }, [refreshKey]);

  const loadEmployees = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getEmployees();

      setEmployees(Array.isArray(data) ? data : []);
    } catch (error) {
      setError(
        error?.message || "Unable to load employees."
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredEmployees = employees.filter((employee) => {
    const searchText = search.trim().toLowerCase();

    if (!searchText) return true;

    return (
      employee.employee_name
        ?.toLowerCase()
        .includes(searchText) ||
      employee.email
        ?.toLowerCase()
        .includes(searchText) ||
      employee.department
        ?.toLowerCase()
        .includes(searchText) ||
      employee.job_title
        ?.toLowerCase()
        .includes(searchText) ||
      employee.nationality
        ?.toLowerCase()
        .includes(searchText)
    );
  });

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <div className="employee-list-page">
        <div className="employee-list-header-page">
          <div>
            <div className="skeleton skeleton-title" />
            <div className="skeleton skeleton-subtitle" />
          </div>
        </div>

        <div className="employee-list-card">
          <div className="list-loading">
            <div className="loading-spinner" />
            <span>Loading employees...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="employee-list-page">



      {/* =====================================================
          MAIN CARD
      ===================================================== */}

      <div className="employee-list-card">

        {/* ===================================================
            TOOLBAR
        =================================================== */}

        <div className="employee-list-toolbar">

          <div className="toolbar-info">
            <span className="toolbar-title">
              Employee Directory
            </span>

            <span className="toolbar-count">
              {filteredEmployees.length}{" "}
              {filteredEmployees.length === 1
                ? "employee"
                : "employees"}
            </span>
          </div>


          <div className="employee-search">

            <svg
              className="search-icon"
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                cx="11"
                cy="11"
                r="7"
                stroke="currentColor"
                strokeWidth="1.8"
              />

              <path
                d="m16.5 16.5 4 4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>

            <input
              type="text"
              placeholder="Search employees..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />

            {search && (
              <button
                type="button"
                className="clear-search"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}

          </div>

        </div>


        {/* ===================================================
            ERROR
        =================================================== */}

        {error && (
          <div className="list-error">

            <div className="error-content">

              <div className="error-icon">
                !
              </div>

              <div>
                <strong>
                  Unable to load employees
                </strong>

                <p>{error}</p>
              </div>

            </div>

            <button
              onClick={loadEmployees}
              className="retry-button"
            >
              Try again
            </button>

          </div>
        )}


        {/* ===================================================
            EMPTY STATE
        =================================================== */}

        {!error &&
          filteredEmployees.length === 0 && (
            <div className="empty-state">

              <div className="empty-icon">

                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />

                  <circle
                    cx="9"
                    cy="7"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />

                  <path
                    d="M22 21v-2a4 4 0 0 0-3-3.87"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />

                  <path
                    d="M16 3.13a4 4 0 0 1 0 7.75"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>

              </div>

              <h2>
                {employees.length === 0
                  ? "No employees yet"
                  : "No employees found"}
              </h2>

              <p>
                {employees.length === 0
                  ? "Add your first employee to start building your directory."
                  : "Try adjusting your search to find what you're looking for."}
              </p>

              {search && (
                <button
                  type="button"
                  className="empty-clear-button"
                  onClick={() => setSearch("")}
                >
                  Clear search
                </button>
              )}

            </div>
          )}


        {/* ===================================================
            TABLE
        =================================================== */}

        {!error &&
          filteredEmployees.length > 0 && (
            <div className="employee-table-wrapper">

              <table className="employee-table">

                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Department</th>
                    <th>Contact</th>
                    <th>Nationality</th>
                    <th>Hire Date</th>
                  </tr>
                </thead>

                <tbody>

                  {filteredEmployees.map((employee) => {

                    const departmentColor =
                      DEPARTMENT_COLORS[
                        employee.department
                      ] || "#64748b";

                    return (
                      <tr key={employee.id}>

                        {/* Employee */}

                        <td>

                          <div className="employee-cell">

                            <div
                              className="employee-avatar"
                              style={{
                                backgroundColor:
                                  getAvatarColor(
                                    employee.employee_name
                                  ),
                              }}
                            >
                              {getInitials(
                                employee.employee_name
                              )}
                            </div>

                            <div className="employee-main-info">

                              <div className="employee-name">
                                {employee.employee_name ||
                                  "Unnamed Employee"}
                              </div>

                              <div className="employee-job">
                                {employee.job_title ||
                                  "Employee"}
                              </div>

                            </div>

                          </div>

                        </td>


                        {/* Department */}

                        <td>

                          <div className="department-cell">

                            <span
                              className="department-dot"
                              style={{
                                backgroundColor:
                                  departmentColor,
                              }}
                            />

                            <span className="department-name">
                              {employee.department ||
                                "Not assigned"}
                            </span>

                          </div>

                        </td>


                        {/* Contact */}

                        <td>

                          <div className="contact-cell">

                            <span className="contact-email">
                              {employee.email || "—"}
                            </span>

                            {employee.phone && (
                              <span className="contact-phone">
                                {employee.phone}
                              </span>
                            )}

                          </div>

                        </td>


                        {/* Nationality */}

                        <td>
                          <span className="table-text">
                            {employee.nationality || "—"}
                          </span>
                        </td>


                        {/* Hire Date */}

                        <td>
                          <span className="hire-date">
                            {formatDate(
                              employee.hire_date
                            )}
                          </span>
                        </td>

                      </tr>
                    );
                  })}

                </tbody>

              </table>

            </div>
          )}

      </div>

    </div>
  );
}

export default EmployeeList;