# README

## Backend Documentation

### Overview
This backend system provides services for student registration, course enrollment, schedule generation, and database management. It uses SQLite for data storage, Python for logic, and an HTTP server for API endpoints.

#### Key Features:
1. **Student Registration**: Handles student registration with validation for email uniqueness and other required fields.
2. **Course Enrollment**: Validates eligibility and enrolls students in courses.
3. **Schedule Generation**: Optimizes schedules using Genetic Algorithms (GA) or Particle Swarm Optimization (PSO).
4. **Database Management**: Handles schema creation and data insertion from an Excel file.

### File Structure
1. `logic.py`: Core functions for student registration, enrollment, and schedule generation.
2. `create_schema.py`: Script to create the database schema and populate it with data from an Excel file.
3. `server.py`: HTTP server to handle API requests.

### Prerequisites
- Python 3.8+
- Required Python packages:
  - `numpy`
  - `pandas`
  - `sqlite3` (builtin with Python)
  - `mealpy`

Install the dependencies using:
```bash
pip install numpy pandas mealpy
```

### Setting Up the Backend

#### Step 1: Prepare the Database
1. Ensure the `data/courses.xlsx` file exists and contains the required data.
2. Run the `create_schema.py` script to create the database and populate tables:
   ```bash
   python create_schema.py
   ```

#### Step 2: Start the Server
Run the `server.py` script to start the backend server on port 8000:
```bash
python server.py
```
The server will listen at `http://localhost:8000`.

### API Endpoints

#### 1. **Student Registration**
- **Endpoint**: `/api/register`
- **Method**: POST
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "securePassword",
    "gpa": 3.5,
    "level": 2
  }
  ```
- **Response**:
  - Success: `{ "message": "Student John Doe registered successfully!" }`
  - Error: `{ "error": "Error message" }`

#### 2. **Fetch Eligible Courses**
- **Endpoint**: `/api/courses`
- **Method**: GET
- **Headers**:
  - `Student-ID: <student_id>`
- **Response**:
  - Success: List of eligible courses.
  - Error: `{ "error": "Error message" }`

#### 3. **Course Enrollment**
- **Endpoint**: `/api/enroll`
- **Method**: POST
- **Request Body**:
  ```json
  {
    "student_id": 1,
    "course_code": "CS101",
    "semester": "Fall 2025"
  }
  ```
- **Response**:
  - Success: `{ "message": "Student enrolled successfully" }`
  - Error: `{ "error": "Error message" }`

#### 4. **Generate Schedule**
- **Endpoint**: `/api/generate-schedule`
- **Method**: POST
- **Request Body**:
  ```json
  {
    "student_id": 1,
    "preferences": {
      "algorithm": "GA",
      "epoch": 100,
      "pop_size": 50,
      "schedule_option": "min_days"
    }
  }
  ```
- **Response**:
  - Success: Optimized schedule.
  - Error: `{ "error": "Error message" }`

### Integration with Frontend
1. **Backend URL**:
   Use `http://localhost:8000` as the base URL for API calls.

2. **CORS**:
   Ensure the frontend allows requests from the backend by adding the appropriate headers.

3. **API Calls**:
   Use `fetch` or `axios` (for JavaScript) to interact with the API.
   Example with `fetch`:
   ```javascript
   fetch("http://localhost:8000/api/register", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify({
       name: "Jane Doe",
       email: "jane.doe@example.com",
       password: "securePassword",
       gpa: 3.8,
       level: 3
     })
   })
   .then(response => response.json())
   .then(data => console.log(data));
   ```

### Running Tests
- Use tools like Postman or Curl to test API endpoints.
- Example Curl command:
  ```bash
  curl -X POST http://localhost:8000/api/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"1234","gpa":3.2,"level":1}'
  ```

### Troubleshooting
1. **Database Not Found**:
   Ensure the `create_schema.py` script was executed successfully.
2. **Port Already in Use**:
   Change the port in `server.py` by modifying the `port` variable in the `run()` function.
3. **CORS Errors**:
   Verify CORS headers in `server.py` and frontend configurations.

### Future Enhancements
- Add user authentication with JWT.
- Improve error handling for API endpoints.
- Add pagination for fetching courses and enrolled sessions.
