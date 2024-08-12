# full-stack---task_managment
Task Management Application
This is a Task Management application built with Laravel (backend) and React (frontend). It includes features for managing tasks and user profiles.

Requirements
PHP >= 8.2
Composer
MySQL
react.js and npm (for the frontend)
Setup Instructions
Backend Setup
Clone the Repository

Clone the repository to your local machine:

git clone https://github.com/mostafafayez/tasks_managment.git
cd tasks_managment
Install PHP Dependencies

Install PHP dependencies using Composer:

composer install
Configure Environment

Copy the example environment file and set up your environment variables:


cp .env.example .env
Edit the .env file to configure your database and other settings. Ensure you set the correct database connection details:

env
Copy code
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=task_managment
DB_USERNAME=root
DB_PASSWORD=


Run the database migrations to set up the database schema:


php artisan migrate


Start the Laravel development server:


php artisan serve
The backend will be available at http://localhost:8000.

#Frontend Setup
Navigate to the Frontend Directory

Change to the frontend directory (assuming it's located within the repository):


cd frontend
Install react.js Dependencies

npm install


Start the React development server:


npm start
The frontend will be available at http://localhost:3000.





####Testing
To run the tests for the backend, use:

php artisan test


##API Endpoints
Here are some of the key API endpoints:



User Endpoints:

User Registration: POST /api/register
User Login: POST /api/user/login
Get User Tasks: GET /api/user/tasks
Update User Profile: POST /api/profile
Task Endpoints (Requires Authentication):

Get User Tasks: GET /api/tasks
Retrieves a list of tasks for the authenticated user.

Create Task: POST /api/tasks
Creates a new task. Requires fields: title, description, due_date, priority.

Update Task: PUT /api/tasks/{id}
Updates an existing task. Requires fields: title, description, due_date, priority.

Delete Task: DELETE /api/tasks/{id}
Deletes a task.

Update Task Status: PATCH /api/tasks/{id}
Updates the status of a task. Requires field: status with possible values completed or pending.

Contributing
If you would like to contribute to this project, please fork the repository and submit a pull request. Ensure that your code follows the project's coding standards and includes appropriate tests.

License
This project is licensed under the MIT License.

