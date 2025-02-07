from flask import Flask
from logic import get_all_courses , register_student ,enroll_student ,generate_schedule ,login_student
from flask import request , jsonify
app = Flask(__name__)

#get method imp
@app.get("/api/courses/<int:student_id>")
def fetch_all_courses(student_id):
    response = get_all_courses(int(student_id))
    return str(response)

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

    response = enroll_student(data["student_id"], data["course_code"], data["semester"])
    return response

@app.post("/api/generate-schedule")
def generate_schedule():
    data=request.get_json()
    student_id= data["student_id"]
    preferences= data["preferences"]
    epoch= preferences["epoch"]
    algorithm= preferences["algorithm"]
    pop_size= preferences["pop_size"]
    schedule_option=preferences["schedule_option"]

    # response = generate_schedule(data["student_id"], data["algorithm"], data["epoch"], data["pop_size"], schedule_option)
    response = generate_schedule(student_id, algorithm, epoch, pop_size, schedule_option)
    print(data)
    return response


@app.post("/api/login")
def login():
    data=request.get_json()

    response = login_student(data["email"], data["password"])
    return response




