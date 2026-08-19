export const validateEmployee = (form) => {

    const errors = {};

    // Employee Name
    if (!form.employee_name.trim())
    {
        errors.employee_name = "Employee name is required.";
    } 
    else if (form.employee_name.trim().length < 2)
    {
        errors.employee_name =
            "Employee name must be at least 2 characters.";
    }

    // Gender
    if (!form.gender)
    {
        errors.gender = "Gender is required.";
    }

    // Marital Status
    if (!form.marital_status)
    {
        errors.marital_status = "Marital status is required.";
    }

    // Phone
    if (!form.phone.trim())
    {
        errors.phone = "Phone number is required.";
    } 
    else if (!/^[0-9+\-\s()]{8,20}$/.test(form.phone))
    {
        errors.phone = "Please enter a valid phone number.";
    }

    // Email
    if (!form.email.trim())
    {
        errors.email = "Email is required.";
    } 
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    {
        errors.email = "Please enter a valid email address.";
    }

    // Address
    if (!form.address.trim())
    {
        errors.address = "Address is required.";
    }

    // Date of Birth
    if (!form.date_of_birth)
    {
        errors.date_of_birth = "Date of birth is required.";
    } 
    else
    {

        const dob = new Date(form.date_of_birth);
        const today = new Date();

        const minimumDate = new Date(
            today.getFullYear() - 18,
            today.getMonth(),
            today.getDate()
        );

        if (dob > minimumDate)
        {
            errors.date_of_birth = "Employee must be at least 18 years old.";
        }
    }

    // Nationality
    if (!form.nationality.trim())
    {
        errors.nationality = "Nationality is required.";
    }

    // Hire Date
    if (!form.hire_date)
    {
        errors.hire_date = "Hire date is required.";
    }

    // Department
    if (!form.department)
    {
        errors.department =
            "Department is required.";
    }

    // Emergency phone
    if
    ( form.emergency_phone && !/^[0-9+\-\s()]{8,20}$/.test(form.emergency_phone))
    {
        errors.emergency_phone =
            "Please enter a valid emergency phone number.";
    }

    return errors;
};