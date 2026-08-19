const API_URL = "http://localhost:8000/api/employeeAPI.php";

export const getEmployees = async () =>
{
    const response = await fetch(API_URL);

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to load employees.");
    }

    return data.employees;
};

export const createEmployee = async (employee) =>
{
    const response = await fetch(API_URL,
    {
        method: "POST",
        headers:
        {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(employee)
    });

    const data = await response.json();

    if (!response.ok)
    {
        const error = new Error(
            data.message || "Failed to create employee."
        );

        error.errors = data.errors || {};

        throw error;
    }

    return data.employee;
};

export const deleteEmployee = async (employeeId) => {
  const response = await fetch(
    `${API_URL}?id=${employeeId}`,
    {
      method: "DELETE",
    }
  );

  const data = await response.json();

  if (!response.ok || data.success === false) {
    throw new Error(
      data.message || "Unable to delete employee."
    );
  }

  return data;
};