<?php

class EmployeeValidator
{
    public static function validate(array $data): array
    {
        $errors = [];

        // Employee Name
        if (empty(trim($data['employee_name'] ?? ''))) {
            $errors['employee_name'] = 'Employee name is required.';
        } elseif (strlen(trim($data['employee_name'])) < 2) {
            $errors['employee_name'] = 'Employee name must be at least 2 characters.';
        } elseif (strlen(trim($data['employee_name'])) > 100) {
            $errors['employee_name'] = 'Employee name cannot exceed 100 characters.';
        }

        // Gender
        $validGenders = ['Male', 'Female', 'Other'];

        if (empty($data['gender'])) {
            $errors['gender'] = 'Gender is required.';
        } elseif (!in_array($data['gender'], $validGenders)) {
            $errors['gender'] = 'Invalid gender.';
        }

        // Marital Status
        $validMaritalStatuses = [
            'Single',
            'Married',
            'Divorced',
            'Widowed'
        ];

        if (empty($data['marital_status'])) {
            $errors['marital_status'] = 'Marital status is required.';
        } elseif (!in_array($data['marital_status'], $validMaritalStatuses)) {
            $errors['marital_status'] = 'Invalid marital status.';
        }

        // Phone
        if (empty(trim($data['phone'] ?? ''))) {
            $errors['phone'] = 'Phone number is required.';
        } elseif (!preg_match('/^[0-9+\-\s()]{8,20}$/', $data['phone'])) {
            $errors['phone'] = 'Invalid phone number.';
        }

        // Email
        if (empty(trim($data['email'] ?? ''))) {
            $errors['email'] = 'Email is required.';
        } elseif (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            $errors['email'] = 'Please enter a valid email address.';
        }

        // Address
        if (empty(trim($data['address'] ?? ''))) {
            $errors['address'] = 'Address is required.';
        }

        // Date of Birth
        if (empty($data['date_of_birth'])) {
            $errors['date_of_birth'] = 'Date of birth is required.';
        } else {
            $dob = DateTime::createFromFormat('Y-m-d', $data['date_of_birth']);

            if (!$dob || $dob->format('Y-m-d') !== $data['date_of_birth']) {
                $errors['date_of_birth'] = 'Invalid date of birth.';
            } else {
                $today = new DateTime();
                $minimumDate = (clone $today)->modify('-18 years');

                if ($dob > $minimumDate) {
                    $errors['date_of_birth'] = 'Employee must be at least 18 years old.';
                }
            }
        }

        // Nationality
        if (empty(trim($data['nationality'] ?? ''))) {
            $errors['nationality'] = 'Nationality is required.';
        }

        // Hire Date
        if (empty($data['hire_date'])) {
            $errors['hire_date'] = 'Hire date is required.';
        } else {
            $hireDate = DateTime::createFromFormat('Y-m-d', $data['hire_date']);

            if (!$hireDate || $hireDate->format('Y-m-d') !== $data['hire_date']) {
                $errors['hire_date'] = 'Invalid hire date.';
            }
        }

        // Department
        if (empty(trim($data['department'] ?? ''))) {
            $errors['department'] = 'Department is required.';
        }

        // Job Title
        if (!empty($data['job_title']) && strlen($data['job_title']) > 100) {
            $errors['job_title'] = 'Job title cannot exceed 100 characters.';
        }

        // Emergency Phone
        if (!empty($data['emergency_phone'])) {
            if (!preg_match('/^[0-9+\-\s()]{8,20}$/', $data['emergency_phone'])) {
                $errors['emergency_phone'] = 'Invalid emergency phone number.';
            }
        }

        return $errors;
    }
}