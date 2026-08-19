import { useState } from "react";
import { createEmployee } from "../service/employeeAPI";
import { validateEmployee } from "../service/employeeValidation";

const initialForm = {
  employee_name: "",
  gender: "",
  marital_status: "",
  phone: "",
  email: "",
  address: "",
  date_of_birth: "",
  nationality: "",
  hire_date: "",
  department: "",
  job_title: "",
  emergency_contact: "",
  emergency_phone: "",
};

function EmployeeForm({ onEmployeeCreated }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    setSuccessMessage("");
  };

  const handleClear = () => {
    setForm(initialForm);
    setErrors({});
    setSuccessMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSuccessMessage("");

    const validationErrors = validateEmployee(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsSubmitting(true);

      const employee = await createEmployee(form);

      setSuccessMessage("Employee added successfully.");

      setForm(initialForm);
      setErrors({});

      if (onEmployeeCreated) {
        onEmployeeCreated(employee);
      }
    } catch (error) {
      if (error.errors) {
        setErrors(error.errors);
      } else {
        setErrors({
          general: error.message || "Something went wrong.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field) =>
    errors[field] ? "form-input error" : "form-input";

  return (
    <div className="employee-form-page">
      <div className="employee-form-card">

        <div className="employee-form-header">
          <h1>Add Employee</h1>
        </div>

        {successMessage && (
          <div className="form-success">
            {successMessage}
          </div>
        )}

        {errors.general && (
          <div className="form-error">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* Personal */}

          <section className="form-section">
            <div className="section-title">
              Personal Information
            </div>

            <div className="form-fields">

              <div className="form-field wide">
                <label>
                  Employee Name <span>*</span>
                </label>

                <input
                  type="text"
                  name="employee_name"
                  value={form.employee_name}
                  onChange={handleChange}
                  placeholder="Full name"
                  className={inputClass("employee_name")}
                />

                {errors.employee_name && (
                  <small>{errors.employee_name}</small>
                )}
              </div>

              <div className="form-field">
                <label>
                  Gender <span>*</span>
                </label>

                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className={inputClass("gender")}
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>

                {errors.gender && (
                  <small>{errors.gender}</small>
                )}
              </div>

              <div className="form-field">
                <label>
                  Marital Status <span>*</span>
                </label>

                <select
                  name="marital_status"
                  value={form.marital_status}
                  onChange={handleChange}
                  className={inputClass("marital_status")}
                >
                  <option value="">Select</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                </select>

                {errors.marital_status && (
                  <small>{errors.marital_status}</small>
                )}
              </div>

              <div className="form-field">
                <label>
                  Date of Birth <span>*</span>
                </label>

                <input
                  type="date"
                  name="date_of_birth"
                  value={form.date_of_birth}
                  onChange={handleChange}
                  className={inputClass("date_of_birth")}
                />

                {errors.date_of_birth && (
                  <small>{errors.date_of_birth}</small>
                )}
              </div>

              <div className="form-field">
                <label>
                  Nationality <span>*</span>
                </label>

                <input
                  type="text"
                  name="nationality"
                  value={form.nationality}
                  onChange={handleChange}
                  placeholder="e.g. Malaysian"
                  className={inputClass("nationality")}
                />

                {errors.nationality && (
                  <small>{errors.nationality}</small>
                )}
              </div>

            </div>
          </section>


          {/* Contact */}

          <section className="form-section">
            <div className="section-title">
              Contact Information
            </div>

            <div className="form-fields">

              <div className="form-field">
                <label>
                  Phone <span>*</span>
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="012 345 6789"
                  className={inputClass("phone")}
                />

                {errors.phone && (
                  <small>{errors.phone}</small>
                )}
              </div>

              <div className="form-field wide">
                <label>
                  Email <span>*</span>
                </label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="employee@example.com"
                  className={inputClass("email")}
                />

                {errors.email && (
                  <small>{errors.email}</small>
                )}
              </div>

              <div className="form-field full">
                <label>
                  Address <span>*</span>
                </label>

                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Full address"
                  rows={2}
                  className={inputClass("address")}
                />

                {errors.address && (
                  <small>{errors.address}</small>
                )}
              </div>

            </div>
          </section>


          {/* Employment */}

          <section className="form-section">
            <div className="section-title">
              Employment Information
            </div>

            <div className="form-fields">

              <div className="form-field">
                <label>
                  Hire Date <span>*</span>
                </label>

                <input
                  type="date"
                  name="hire_date"
                  value={form.hire_date}
                  onChange={handleChange}
                  className={inputClass("hire_date")}
                />

                {errors.hire_date && (
                  <small>{errors.hire_date}</small>
                )}
              </div>

              <div className="form-field">
                <label>
                  Department <span>*</span>
                </label>

                <select
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  className={inputClass("department")}
                >
                  <option value="">Select</option>
                  <option value="IT">IT</option>
                  <option value="Human Resources">
                    Human Resources
                  </option>
                  <option value="Finance">Finance</option>
                  <option value="Sales">Sales</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Operations">Operations</option>
                </select>

                {errors.department && (
                  <small>{errors.department}</small>
                )}
              </div>

              <div className="form-field">
                <label>Job Title</label>

                <input
                  type="text"
                  name="job_title"
                  value={form.job_title}
                  onChange={handleChange}
                  placeholder="e.g. Software Developer"
                  className="form-input"
                />
              </div>

            </div>
          </section>


          {/* Emergency */}

          <section className="form-section">
            <div className="section-title">
              Emergency Contact
            </div>

            <div className="form-fields">

              <div className="form-field">
                <label>Contact Name</label>

                <input
                  type="text"
                  name="emergency_contact"
                  value={form.emergency_contact}
                  onChange={handleChange}
                  placeholder="Full name"
                  className="form-input"
                />
              </div>

              <div className="form-field">
                <label>Contact Phone</label>

                <input
                  type="tel"
                  name="emergency_phone"
                  value={form.emergency_phone}
                  onChange={handleChange}
                  placeholder="012 345 6789"
                  className={inputClass("emergency_phone")}
                />

                {errors.emergency_phone && (
                  <small>{errors.emergency_phone}</small>
                )}
              </div>

            </div>
          </section>


          <div className="form-footer">
            <button
              type="button"
              className="clear-button"
              onClick={handleClear}
            >
              Clear
            </button>

            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Add Employee"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default EmployeeForm;