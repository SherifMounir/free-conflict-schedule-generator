from flask import Flask
from logic import get_student_instructors , get_all_courses ,get_student_profile , register_student ,enroll_student ,generate_schedule ,login_student, unenrolled_course ,accepted_schedule , student_schedule
from flask import request , jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app, origins="http://localhost:3000")

#get method imp
@app.get("/api/courses/<int:student_id>")
def fetch_all_courses(student_id):
    response = get_all_courses(int(student_id))
    return response

@app.get("/api/profile/<int:student_id>")
def student_profile(student_id):
    response = get_student_profile(int(student_id))
    
    if isinstance(response, dict) and "error" in response:
        return jsonify(response), 404 if response["error"] == "Student not found" else 500
    
    if not isinstance(response, tuple) or len(response) != 5:
        return jsonify({"error": "Invalid student data format"}), 500
    
    student_data = {
        "level": response[0],
        "id": response[1],
        "name": response[2],
        "gpa": response[3],
        "email": response[4]
    }
    
    return jsonify(student_data)


@app.post("/api/student_schedule")
def get_student_schedule():
    try:
        data = request.get_json()
        print("Received Data:", data)

        response = student_schedule(data["student_id"])  

        print("Response:", response)
        return jsonify(response)

    except Exception as e:
        return jsonify({"schedule": {}, "error": f"Unexpected error: {str(e)}"}), 500



# post methos imp
@app.post("/api/register")
def register():
    data=request.get_json()
    response = register_student(
                data["name"],
                data["email"],
                data["password"],
                data["gpa"],
                data["level"])
    return response

@app.post("/api/enroll")
def enroll():
    data=request.get_json()

    response = enroll_student(data["student_id"], data["course_code"])
    return response

@app.post("/api/generate-schedule")
def do_generate_schedule():
    data=request.get_json()
    student_id= data["student_id"]
    preferences= data["preferences"]
    epoch= preferences["epoch"]
    algorithm= preferences["algorithm"]
    pop_size= preferences["pop_size"]
    schedule_option=preferences["schedule_option"]
    preferred_instructors = preferences.get("preferred_instructor", []) 


    # response = generate_schedule(data["student_id"], data["algorithm"], data["epoch"], data["pop_size"], schedule_option)
    response = generate_schedule(student_id, algorithm, epoch, pop_size, schedule_option , preferred_instructor=preferred_instructors)
    print(data)
    return response


@app.post("/api/login")
def login():
    data=request.get_json()
    if data["email"] == "demo@aucegypt.edu" and data["password"] == "123456":
        return {
            "gpa": 3.9,
            "level": "Senior",
            "name": "Demo Student",
            "id": 9999
        }

    response = login_student(data["email"], data["password"])
    return response



@app.post("/api/unenroll")
def unenroll():
    data=request.get_json()

    response = unenrolled_course(data["student_id"], data["course_code"])
    return response

@app.post("/api/get-instructors")
def do_get_instructors():
    data = request.get_json()
    student_id = data["student_id"]
    
    response, status_code = get_student_instructors(student_id)
    return jsonify(response), status_code


@app.route("/api/accept-schedule", methods=["POST"])
def accept_schedule():
    try:
        data = request.get_json()  # Getting JSON payload
        print("Received data:", data)  

        student_id = data.get("student_id")  
        schedule_schema = data.get("schedule_schema")  

        print("Extracted student_id:", student_id)
        print("Extracted schedule_schema:", schedule_schema)

        if not student_id or not schedule_schema:
            return jsonify({"error": "Missing student_id or schedule_schema"}), 400

        # Convert dictionary to JSON string **before inserting into the DB**
        schedule_json = json.dumps(schedule_schema)

        # Call function to insert into DB
        response = accepted_schedule(student_id, schedule_json)

        return jsonify(response)

    except Exception as e:
        return jsonify({"error": f"Error while accepting schedule: {str(e)}"}), 500






