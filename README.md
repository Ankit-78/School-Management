# School Management 

## Description

The School Management  is a Node.js application that allows users to manage school data. It includes endpoints to add new schools and list schools sorted by proximity to a given location.

## Technologies Used

- Node.js
- Express.js
- MySQL

## API Endpoints

### Add School

- **Endpoint:** `/addSchool`
- **Method:** `POST`
- **Description:** Adds a new school to the database.
- **Request Body:**
  ```json
  {
    "name": "School Name",
    "address": "School Address",
    "latitude": 34.0522,
    "longitude": -118.244
  }

Responses:
201 Created: School added successfully.
400 Bad Request: All fields are required.
500 Internal Server Error: Error adding school.
List Schools
Endpoint: /listSchools
Method: GET
Description: Lists all schools sorted by proximity to the provided latitude and longitude.
Query Parameters:
lat (float): Latitude of the user's location.
lng (float): Longitude of the user's location.
Responses:
200 OK: List of schools with distance from the specified location.
400 Bad Request: Latitude and Longitude are required.
500 Internal Server Error: Error fetching schools.

# Setup and Installation
Local Setup
Clone the repository: 

git clone :  https://github.com/YourUsername/School-Management.git
Navigate into the project directory:

cd school-management
Install dependencies:

npm install
Create a .env file in the root directory with the following environment variables:

DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
PORT=3000
# Start the server:

npm start
The server will run on http://localhost:3000.

# Deployment

Deploy the web service on Render


Build Command: npm install
Start Command: npm start
