# full-stack---task_managment


tasks_managment_backend
Description This is a Task Management application built with Laravel and Sanctum for authentication. It includes features for managing tasks and user profiles.

Requirements PHP >= 8.2 Composer MySQL Setup Instructions

Clone the Repository Clone the repository to your local machine:
git clone https://github.com/mostafafayez/tasks_managment.git

cd tasks_managment 2. Install PHP Dependencies Install PHP dependencies using Composer:

composer install

Configure Environment Copy the example environment file and set up your environment variables:
cp .env.example .env

Edit the .env file to configure your database and other settings. Ensure you set the correct database connection details:

env Copy code

DB_CONNECTION=mysql DB_HOST=127.0.0.1 DB_PORT=3306 DB_DATABASE=your_database DB_USERNAME=your_username DB_PASSWORD=your_password 4. Migrate the Database Run the database migrations to set up the database schema:

php artisan migrate 5. Start the Development Server Start the Laravel development server:

php artisan serve The application will be available at http://localhost:8000.

Testing To run the tests, use:
php artisan test Or using PHPUnit directly:

vendor/bin/phpunit

API Endpoints Here are some of the key API endpoints:
User Registration: POST /api/register User Login: POST /api/user/login Get User Tasks: GET /api/user/tasks Update User Profile: POST /api/profile

Task Endpoints (Requires Authentication) Get User Tasks: GET /api/tasks Retrieves a list of tasks for the authenticated user. Create Task: POST /api/tasks Creates a new task. Requires fields: title, description, due_date, priority. Update Task: PUT /api/tasks/{id} Updates an existing task. Requires fields: title, description, due_date, priority. Delete Task: DELETE /api/tasks/{id} Deletes a task. Update Task Status: PATCH /api/tasks/{id} Updates the status of a task. Requires field: status with possible values completed or pending.

Contributing If you would like to contribute to this project, please fork the repository and submit a pull request. Ensure that your code follows the project's coding standards and includes appropriate tests.

License This project is licensed under the MIT License.
