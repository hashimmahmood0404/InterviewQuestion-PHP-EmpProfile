<?php

class EmployeeService
{
    private string $filePath;

    public function __construct()
    {
        $this->filePath = __DIR__ . '/../data/employees.json';

        // Create the JSON file if it doesn't exist
        if (!file_exists($this->filePath)) {
            file_put_contents(
                $this->filePath,
                json_encode([], JSON_PRETTY_PRINT)
            );
        }
    }

    /**
     * Get all employees
     */
    public function getAll(): array
    {
        $content = file_get_contents($this->filePath);

        if ($content === false || trim($content) === '') {
            return [];
        }

        $employees = json_decode($content, true);

        if (!is_array($employees)) {
            return [];
        }

        return $employees;
    }

    /**
     * Get employee by ID
     */
    public function getById(string $id): ?array
    {
        $employees = $this->getAll();

        foreach ($employees as $employee) {

            if (
                isset($employee['id']) &&
                $employee['id'] === $id
            ) {
                return $employee;
            }
        }

        return null;
    }

    /**
     * Create a new employee
     */
    public function create(array $data): array
    {
        $employees = $this->getAll();

        $employee = [
            'id' => bin2hex(random_bytes(8)),

            'employee_name' =>
                trim($data['employee_name'] ?? ''),

            'gender' =>
                $data['gender'] ?? '',

            'marital_status' =>
                $data['marital_status'] ?? '',

            'phone' =>
                trim($data['phone'] ?? ''),

            'email' =>
                trim($data['email'] ?? ''),

            'address' =>
                trim($data['address'] ?? ''),

            'date_of_birth' =>
                $data['date_of_birth'] ?? '',

            'nationality' =>
                trim($data['nationality'] ?? ''),

            'hire_date' =>
                $data['hire_date'] ?? '',

            'department' =>
                trim($data['department'] ?? ''),

            'job_title' =>
                trim($data['job_title'] ?? ''),

            'emergency_contact' =>
                trim($data['emergency_contact'] ?? ''),

            'emergency_phone' =>
                trim($data['emergency_phone'] ?? ''),

            'created_at' =>
                date('Y-m-d H:i:s')
        ];

        $employees[] = $employee;

        $this->save($employees);

        return $employee;
    }

    
    
    /**
     * Save employees to JSON
     */
    private function save(array $employees): void
    {
        $json = json_encode(
            $employees,
            JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES
        );

        if ($json === false) {
            throw new Exception(
                'Unable to convert employee data to JSON.'
            );
        }

        $result = file_put_contents(
            $this->filePath,
            $json,
            LOCK_EX
        );

        if ($result === false) {
            throw new Exception(
                'Unable to save employees to JSON file.'
            );
        }
    }
}