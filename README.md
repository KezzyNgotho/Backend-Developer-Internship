# Overview
inventory-api is a robust inventory management system designed to streamline your business operations.
  With features tailored to meet the needs of small and medium-sized enterprises, this application simplifies inventory tracking and optimizes your supply chain.

## Setup Instructions
To get started with inventory-api, follow these steps:

1. Clone the repository to your local machine:
git clone https://github.com/KezzyNgotho/Backend-Developer-Internship
2.Install dependencies using npm:
first create the folder and inside  the folder create another folder where the backend application will be  .
run the first comand  npm init -y to create the json files.
  npm install
  npm install bcryptjs@^2.4.3 body-parser@^1.20.2 dotenv@^16.4.5 express@^4.18.3 jsonwebtoken@^9.0.2 nodemon@^1.3.6 pg@^8.11.3 --save
the command above will install all the required dependencies
Set up your environment variables by creating a .env file in the root directory. Include the following variables:

DB_USER=your_database_user
DB_HOST=your_database_host
DB_NAME=your_database_name
DB_PASSWORD=your_database_password
DB_PORT=your_database_port
SECRET_KEY=your_secret_key_for_jwt
Start the server:
node server.js

### Prerequisites
Before running iventory-api , make sure you have the following installed:
Node.js
PostgreSQL

#### Application Structure
The application structure is organized as follows:

server.js: Entry point of the application.
middleware/verifyToken.js: Middleware function to verify JWT tokens.
controllers/: Contains controller functions for handling HTTP requests.
routes/: Defines routes and connects them to corresponding controller functions.
db/: Contains database connection setup.
models/: Defines database models.
README.md: This file providing setup instructions and application overview.

##### Components
Database: PostgreSQL database is used for storing inventory data.
Server: Node.js server powered by Express.js handles HTTP requests.
Authentication: JSON Web Tokens (JWT) are used for user authentication.
CRUD Operations: Create, Read, Update, Delete operations are implemented for managing inventory items.
