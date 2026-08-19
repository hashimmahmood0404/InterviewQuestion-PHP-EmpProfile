<?php

header('Content-Type: application/json');

header('Access-Control-Allow-Origin: http://localhost:5173');

header('Access-Control-Allow-Methods: GET, POST, OPTIONS');

header('Access-Control-Allow-Headers: Content-Type');

// Handle CORS preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS')
{
    http_response_code(204);
    exit;
}

require_once __DIR__ . '/../service/EmployeeService.php';
require_once __DIR__ . '/../service/EmployeeValidator.php';

$service = new EmployeeService();

$method = $_SERVER['REQUEST_METHOD'];

try {

    switch ($method) {

        // GET /api/employees.php
        case 'GET':

            $id = $_GET['id'] ?? null;

            if ($id) {

                $employee = $service->getById($id);

                if (!$employee) {
                    http_response_code(404);

                    echo json_encode([
                        'success' => false,
                        'message' => 'Employee not found.'
                    ]);

                    exit;
                }

                echo json_encode([
                    'success' => true,
                    'employee' => $employee
                ]);

                exit;
            }

            $employees = $service->getAll();

            echo json_encode([
                'success' => true,
                'employees' => $employees
            ]);

            exit;


        // Create employee
        case 'POST':

            $rawData = file_get_contents('php://input');

            $data = json_decode($rawData, true);

            if (!is_array($data))
            {

                http_response_code(400);

                echo json_encode([
                    'success' => false,
                    'message' => 'Invalid JSON request.'
                ]);

                exit;
            }

            // Backend validation
            $errors = EmployeeValidator::validate($data);

            if (!empty($errors))
            {

                http_response_code(422);

                echo json_encode([
                    'success' => false,
                    'message' => 'Validation failed.',
                    'errors' => $errors
                ]);

                exit;
            }

            // Save employee
            $employee = $service->create($data);

            http_response_code(201);

            echo json_encode
            ([
                'success' => true,
                'message' => 'Employee created successfully.',
                'employee' => $employee
            ]);

            exit;


        default:

            http_response_code(405);

            echo json_encode
            ([
                'success' => false,
                'message' => 'Method not allowed.'
            ]);

            exit;
    }

}  catch (Throwable $e) {

    http_response_code(500);

    echo json_encode([
        'success' => false,
        'message' => $e->getMessage(),
        'file' => $e->getFile(),
        'line' => $e->getLine()
    ]);
}